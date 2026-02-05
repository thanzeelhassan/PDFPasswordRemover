// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

let processedPdfBytes = null;

// File input handler
document.getElementById("pdfFile").addEventListener("change", (e) => {
  const fileName = e.target.files[0]?.name;
  document.getElementById("fileName").textContent = fileName
    ? `Selected: ${fileName}`
    : "";
});

// Remove button handler
document
  .getElementById("removeBtn")
  .addEventListener("click", removePdfPassword);

// Download button handler
document.getElementById("downloadBtn").addEventListener("click", downloadPdf);

async function removePdfPassword() {
  const fileInput = document.getElementById("pdfFile");
  const password = document.getElementById("password").value;
  const statusDiv = document.getElementById("status");
  const progressContainer = document.getElementById("progressContainer");
  const removeBtn = document.getElementById("removeBtn");

  // Validation
  if (!fileInput.files.length) {
    showStatus("Please select a PDF file", "error");
    return;
  }

  if (!password) {
    showStatus("Please enter the PDF password", "error");
    return;
  }

  try {
    removeBtn.disabled = true;
    showStatus("Processing your PDF...", "info");
    progressContainer.style.display = "block";
    updateProgress(10);

    // Read file as ArrayBuffer
    const fileBuffer = await readFile(fileInput.files[0]);
    updateProgress(20);

    // Load PDF with password
    const pdf = await loadPdfWithPassword(fileBuffer, password);
    updateProgress(40);

    // Render PDF pages as images and create new PDF
    processedPdfBytes = await convertPdfToPasswordFreePdf(pdf);
    updateProgress(100);

    showStatus("PDF password successfully removed!", "success");
    document.getElementById("resultCard").style.display = "block";
  } catch (error) {
    console.error("Error:", error);
    showStatus(`Error: ${error.message}`, "error");
  } finally {
    removeBtn.disabled = false;
    setTimeout(() => {
      progressContainer.style.display = "none";
    }, 500);
  }
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

async function loadPdfWithPassword(fileBuffer, password) {
  try {
    const pdf = await pdfjsLib.getDocument({
      data: new Uint8Array(fileBuffer),
      password: password,
    }).promise;
    return pdf;
  } catch (error) {
    if (error.message.includes("Invalid PDF")) {
      throw new Error("Invalid PDF file");
    } else if (error.message.includes("password")) {
      throw new Error("Incorrect password or PDF is corrupted");
    }
    throw error;
  }
}

async function convertPdfToPasswordFreePdf(pdf) {
  const { PDFDocument, PDFPage } = PDFLib;
  const newPdf = await PDFDocument.create();

  const pageCount = pdf.numPages;

  for (let i = 1; i <= pageCount; i++) {
    try {
      const page = await pdf.getPage(i);

      // Create canvas for rendering
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const viewport = page.getViewport({ scale: 2 }); // Higher scale for better quality

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Render page to canvas
      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;

      // Convert canvas to image
      const imgData = canvas.toDataURL("image/png");
      const imgBytes = await fetch(imgData).then((res) => res.arrayBuffer());

      // Embed image in new PDF
      const image = await newPdf.embedPng(imgBytes);
      const pdfPage = newPdf.addPage([viewport.width, viewport.height]);
      pdfPage.drawImage(image, {
        x: 0,
        y: 0,
        width: viewport.width,
        height: viewport.height,
      });

      // Update progress
      const progress = 40 + (i / pageCount) * 60;
      updateProgress(progress);
    } catch (error) {
      console.error(`Error processing page ${i}:`, error);
      throw new Error(`Error processing page ${i}: ${error.message}`);
    }
  }

  return await newPdf.save();
}

function updateProgress(percent) {
  document.getElementById("progressBar").style.width = percent + "%";
}

function showStatus(message, type) {
  const statusDiv = document.getElementById("status");
  statusDiv.textContent = message;
  statusDiv.className = "status " + type;
}

function downloadPdf() {
  if (!processedPdfBytes) {
    showStatus("No PDF to download", "error");
    return;
  }

  const blob = new Blob([processedPdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "password_removed.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
