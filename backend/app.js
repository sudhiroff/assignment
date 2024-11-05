var createError = require('http-errors');
var express = require('express');
const multer = require('multer');
const fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const upload = multer({ dest: 'uploads/' });

// Helper function to compare files line by line
function compareFiles(file1Path, file2Path) {
  const file1Content = fs.readFileSync(file1Path, 'utf-8');
  const file2Content = fs.readFileSync(file2Path, 'utf-8');

  const file1Lines = file1Content.split('\n');
  const file2Lines = file2Content.split('\n');
  const differences = [];

  const maxLines = Math.max(file1Lines.length, file2Lines.length);

  for (let i = 0; i < maxLines; i++) {
    if (file1Lines[i] !== file2Lines[i]) {
      differences.push({
        line: i + 1,
        file1: file1Lines[i] || '',
        file2: file2Lines[i] || '',
      });
    }
  }

  return differences;
}

// Endpoint to compare two files
app.post('/api/compare', upload.fields([{ name: 'file1' }, { name: 'file2' }]), (req, res) => {
  const file1 = req.files.file1?.[0];
  const file2 = req.files.file2?.[0];

  if (!file1 || !file2) {
    return res.status(400).json({ error: 'Both files are required' });
  }

  try {
    // Compare files and get differences
    const differences = compareFiles(file1.path, file2.path);

    // Clean up uploaded files
    fs.unlinkSync(file1.path);
    fs.unlinkSync(file2.path);

    // Return the comparison result
    res.json({ differences });
  } catch (error) {
    console.error('Error comparing files:', error);
    res.status(500).json({ error: 'Failed to compare files' });
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
