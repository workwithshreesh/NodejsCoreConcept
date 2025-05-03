const { spawn } = require("child_process");
const path = require("path");

const pythonPath = path.join(__dirname, "env", "Scripts", "python.exe");

const pdfPath = path.join(__dirname, "simple_pdf.pdf");
const pythonProcess = spawn(pythonPath, ["container.py", pdfPath]);

pythonProcess.stdout.on("data", (data) => {
  console.log("PDF Text:\n", data.toString());
});

pythonProcess.stderr.on("data", (data) => {
  console.error("Error:", data.toString());
});

pythonProcess.on("close", (code) => {
  console.log(`Child process exited with code ${code}`);
});
