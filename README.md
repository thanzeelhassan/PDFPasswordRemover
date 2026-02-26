# PDF Password Remover

A simple, seamless web application to remove password protection from PDF files. Works **100% in your browser**—no server needed, no files uploaded anywhere. Upload a PDF, enter the password, and download it password-free.

## Features

✅ **Pure JavaScript** - No backend server required  
✅ **Native PDF processing** - Uses WASM-compiled qPDF (industry standard)
✅ **Zero file uploads** - Everything processed locally in your browser  
✅ **Preserves PDF quality** - Decrypts without converting to images  
✅ **Password decryption** - Opens encrypted PDFs with your password  
✅ **Cross-platform** - Works on Windows, macOS, Linux, mobile  
✅ **Free to use** - Open source, hosted on GitHub Pages

## Quick Start

### Option A: Use Online (Easiest)

Just visit: **https://yourusername.github.io/PDFPasswordRemover** (after deploying)

### Option B: Use Locally

1. Download or clone this repository
2. Open `index.html` in your web browser
3. That's it! No installation, no setup needed

## How to Deploy to GitHub Pages

1. **Push code to GitHub:**

   ```bash
   git add .
   git commit -m "Add PDF Password Remover"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository settings
   - Find "Pages" in the left sidebar
   - Under "Build and deployment", select:
     - Source: `Deploy from a branch`
     - Branch: `main` → `/ (root)`
   - Click Save

3. **Visit your site:**
   - GitHub will show you the URL: `https://yourusername.github.io/PDFPasswordRemover`
   - Your site is live! Share the link

## How It Works

1. **You select and upload** your password-protected PDF
2. **qPDF WASM** (industry-standard PDF tool compiled to WebAssembly) decrypts it using your password
3. **Original PDF preserved** - No image conversion, no quality loss
4. **You download** the password-free PDF to your computer

Everything happens **in your browser**. Your PDF never leaves your computer or goes to any server. Uses the same battle-tested qPDF engine that powers professional PDF tools worldwide.

## Privacy & Security

🔒 **100% Private**

- Your PDFs are never uploaded to any server
- Password processing happens only in your browser
- No logs, no records, no tracking
- All processing stops when you close the browser

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **PDF Decryption**: [qPDF WASM](https://github.com/jsscheller/qpdf-wasm) - Official qPDF compiled to WebAssembly
- **Hosting**: GitHub Pages (free, fast, secure)

## Why qPDF WASM?

- **Industry standard** - qPDF is used by professionals worldwide for PDF encryption/decryption
- **No image conversion** - Original PDF structure and quality preserved
- **Open source** - Based on the same qPDF used in production environments
- **Browser-ready** - Compiled to WebAssembly to work directly in browsers

## Requirements

All you need is:

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (to load the PDF libraries from CDN)

## How to Use

1. **Open the web app** (local or online)
2. **Click "Select PDF File"** and choose your encrypted PDF
3. **Enter the PDF password** in the text field
4. **Click "Remove Password"** and wait for processing
5. **Click "Download"** to save your password-free PDF

## Troubleshooting

**"Error: Incorrect password"**

- Double-check your password (case-sensitive)
- Try opening the PDF in Adobe Reader to confirm it opens with that password

**"Error: Failed to process PDF"**

- The PDF might be corrupted or use unsupported encryption
- Try a different PDF file

**Download not working**

- Check your browser's popup/download settings
- Some browsers block file downloads from local files
- Try a different browser

**Slow processing**

- Large PDFs take longer to process
- This is normal—your browser is rendering each page

## Limitations

- First load takes a moment for qPDF WASM to initialize (~1-2 seconds)
- Some advanced PDF features (forms, annotations) may not be editable in the output
- Works best with standard password-protected PDFs (AES-based encryption)

## File Structure

```
PDFPasswordRemover/
├── index.html       # Web interface
├── script.js        # Core functionality
├── style.css        # Styling
├── README.md        # This file
└── learn/           # Reference examples (optional)
```

## FAQ

**Q: Is my password stored anywhere?**  
A: No. Your password is only used by PDF.js in your browser to decrypt the PDF. It's never sent anywhere.

**Q: Is this free?**  
A: Yes! The code is open source on GitHub, and hosting is free via GitHub Pages.

**Q: Can I use this offline?**  
A: Yes—download the repo and open `index.html` in your browser. The PDF libraries are loaded from CDN the first time. After that, your browser caches them.

**Q: Why not use a server backend?**  
A: A local-only solution is faster, more private, doesn't require server costs, and your data stays on your computer. WASM (WebAssembly) lets us run native code like qPDF directly in the browser.

**Q: Is this really native PDF decryption?**  
A: Yes! qPDF WASM is the official qPDF library compiled to WebAssembly. It's the same encryption/decryption engine used by professional PDF tools—just running in your browser instead of on a server.

**Q: Can I modify or host this myself?**  
A: Absolutely! The code is open source. Fork it, modify it, and deploy it however you want.

## Support

Have questions or found a bug?

- Open an issue on GitHub
- Check the Troubleshooting section above

## License

MIT License - You're free to use, modify, and distribute this project

---

**Ready to get started?**

- 🌍 **Online**: Deploy to GitHub Pages (instructions above)
- 💻 **Local**: Just open `index.html` in your browser
