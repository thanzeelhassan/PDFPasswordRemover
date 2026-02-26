// WASM qPDF initialization
let qpdfReady = false;
let qpdfModule = null;

// Initialize qPDF WASM module
(async () => {
  try {
    // qpdf-wasm loads globally as 'qpdf' function
    if (typeof qpdf !== "undefined") {
      qpdfReady = true;
      console.log("qPDF WASM loaded successfully");
    }
  } catch (e) {
    console.error("qPDF WASM loading error:", e);
  }
})();

let processedPdfBytes = null;
let originalFileName = "";

// File input handler
document.getElementById("pdfFile").addEventListener("change", (e) => {
  const fileName = e.target.files[0]?.name;
  originalFileName = fileName;
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

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

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

  if (!qpdfReady) {
    showStatus(
      "qPDF is loading... Please wait a moment and try again",
      "error"
    );
    return;
  }

  try {
    removeBtn.disabled = true;
    showStatus("Processing your PDF with native qPDF...", "info");
    progressContainer.style.display = "block";
    updateProgress(10);

    // Read the PDF file
    const fileBuffer = await readFile(fileInput.files[0]);
    updateProgress(20);

    // Use qpdf-wasm to decrypt
    // The module exposes a run() function for CLI-like operations
    const inputPath = "/input.pdf";
    const outputPath = "/output.pdf";

    try {
      // Create a Uint8Array from the buffer
      const pdfBytes = new Uint8Array(fileBuffer);

      // Write input PDF to virtual filesystem
      qpdf.FS.writeFile(inputPath, pdfBytes);
      updateProgress(30);

      // Run qPDF to decrypt with password
      // Command: qpdf --password=<password> --decrypt input.pdf output.pdf
      const result = await new Promise((resolve, reject) => {
        try {
          qpdf.run([
            "--password=" + password,
            "--decrypt",
            inputPath,
            outputPath
          ]);
          resolve();
        } catch (err) {
          reject(err);
        }
      });

      updateProgress(70);

      // Read the decrypted PDF from virtual filesystem
      const decryptedBytes = qpdf.FS.readFile(outputPath);
      processedPdfBytes = decryptedBytes.buffer;

      // Clean up virtual filesystem
      try {
        qpdf.FS.unlink(inputPath);
        qpdf.FS.unlink(outputPath);
      } catch (e) {
        console.log("Cleanup note:", e.message);
      }

      updateProgress(100);
      showStatus("PDF password successfully removed! (Native qPDF)", "success");
      document.getElementById("resultCard").style.display = "block";
    } catch (qpdfError) {
      console.error("qPDF error:", qpdfError);
      if (
        qpdfError.message &&
        qpdfError.message.toLowerCase().includes("password")
      ) {
        showStatus(
          "Error: Incorrect password or PDF is not encrypted",
          "error"
        );
      } else {
        showStatus(
          `Error: ${qpdfError.message || "Failed to decrypt PDF"}`,
          "error"
        );
      }
    }
  } catch (error) {
    console.error("Error:", error);
    showStatus(
      `Error: ${error.message || "Failed to process PDF"}`,
      "error"
    );
  } finally {
    removeBtn.disabled = false;
    setTimeout(() => {
      progressContainer.style.display = "none";
    }, 500);
  }
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
  a.download = originalFileName || "password_removed.pdf";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showStatus("PDF downloaded successfully!", "success");
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
  a.download = originalFileName || "password_removed.pdf";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showStatus("PDF downloaded successfully!", "success");
}
