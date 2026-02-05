# PDF Password Remover

A simple, user-friendly web application to remove password protection from PDF files. Built with HTML, CSS, and JavaScript.

## Features

- 🔐 Remove password protection from encrypted PDFs
- ⚡ Fast client-side processing (no server required)
- 🎨 Modern, responsive UI
- 📱 Works on desktop and mobile devices
- 🔒 Your files are processed locally in your browser - no uploads to servers

## How to Use

1. **Open the Application**: Open `index.html` in your web browser
2. **Select a PDF File**: Click "Select PDF File" and choose your password-protected PDF
3. **Enter the Password**: Type the password for your PDF
4. **Remove Password**: Click "Remove Password" button
5. **Download**: Once processed, click "Download Password-Free PDF" to get your unprotected file

## Technical Details

### How It Works

The application uses client-side processing:

1. **PDF.js** - Reads the password-protected PDF using the provided password
2. **Rendering** - Each page is rendered to a canvas image
3. **pdf-lib** - Creates a new PDF from the rendered images without password protection
4. **Download** - Generated PDF is offered for download

### What You Need

- A modern web browser (Chrome, Firefox, Safari, Edge, etc.)
- An internet connection (to load the PDF libraries via CDN)
- The correct password for your PDF

### Libraries Used

- **PDF.js v3.11.174** - For reading and rendering protected PDFs
- **pdf-lib v1.17.1** - For creating new PDFs without password protection

## Important Notes

⚠️ **Privacy & Security**:

- All processing happens in your browser
- Your files are never uploaded anywhere
- No records are kept of your PDFs or passwords
- Clear this page after use if using a shared computer

⚠️ **Limitations**:

- The output PDF will be image-based, which may increase file size
- Interactive elements in the original PDF may not be preserved
- Text selection in the output is not possible (since pages are images)

## System Requirements

- Modern browser with JavaScript enabled
- At least 100MB free RAM for processing large PDFs
- ~50MB of browser cache for temporary processing

## Troubleshooting

**"Error: Incorrect password"**

- Verify the password is correct and try again
- Make sure the PDF is actually password-protected

**"Error: Invalid PDF file"**

- The file may be corrupted
- Try opening it in Adobe Reader first to verify its integrity

**Slow Processing**

- Large PDFs with many pages may take time to process
- This is normal - the browser is rendering each page

**High Memory Usage**

- Processing very large PDFs can consume significant RAM
- Try processing smaller PDFs first if you encounter issues

## Browser Compatibility

- ✅ Chrome/Chromium (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v15+)
- ✅ Edge (v90+)
- ⚠️ Internet Explorer - Not supported

## License

This project is provided as-is for personal and commercial use.

## Disclaimer

This tool is provided for legitimate purposes only. Ensure you have the legal right to remove passwords from any PDFs you process. Users are responsible for complying with all applicable laws and regulations.
PDFPasswordRemover
