// const express = require('express');
// const { google } = require('googleapis');
// const path = require('path');

// const app = express();
// const PORT = 3000;

// const KEYFILEPATH = './sheet-reader-xyz123.json';
// const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// const SHEET_ID = '1qpC5ibaBdicT-huMOuIXWtBGDyRF3ovpKQZFMRYjGuk';

// app.use(express.static(__dirname)); // Serve index.html etc.

// const auth = new google.auth.GoogleAuth({
//   keyFile: KEYFILEPATH,
//   scopes: SCOPES,
// });

// app.get('/data', async (req, res) => {
//   try {
//     const client = await auth.getClient();
//     const sheets = google.sheets({ version: 'v4', auth: client });

//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: SHEET_ID,
//       range: 'Sheet1',
//     });

//     const rows = response.data.values;
//     if (!rows || rows.length < 2) {
//       return res.status(404).json({ error: 'No data found' });
//     }

//     const headers = rows[0];
//     const lastRow = rows[rows.length - 1];

//     const rowData = {};
//     headers.forEach((h, i) => (rowData[h] = lastRow[i] || ''));

//     res.json(rowData);
//   } catch (err) {
//     console.error('❌ Server Error:', err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });


// const express = require('express');
// const { google } = require('googleapis');
// const path = require('path');

// const app = express();
// const PORT = 3000;

// const KEYFILEPATH = './sheet-reader-xyz123.json';
// const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// const SHEET_ID = '1qpC5ibaBdicT-huMOuIXWtBGDyRF3ovpKQZFMRYjGuk';

// app.use(express.static(__dirname)); // Serve index.html etc.

// const auth = new google.auth.GoogleAuth({
//   keyFile: KEYFILEPATH,
//   scopes: SCOPES,
// });

// app.get('/data', async (req, res) => {
//   try {
//     const client = await auth.getClient();
//     const sheets = google.sheets({ version: 'v4', auth: client });

//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: SHEET_ID,
//       range: 'Sheet1',
//     });

//     const rows = response.data.values;
//     if (!rows || rows.length < 2) {
//       return res.status(404).json({ error: 'No data found' });
//     }

//     const headers = rows[0];
//     const lastRow = rows[rows.length - 1];

//     const rowData = {};
//     headers.forEach((h, i) => (rowData[h] = lastRow[i] || ''));

//     res.json(rowData);
//   } catch (err) {
//     console.error('❌ Server Error:', err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });


// const express = require('express');
// const { google } = require('googleapis');
// const path = require('path');

// const app = express();
// const PORT = 3000;

// const KEYFILEPATH = './sheet-reader-xyz123.json';
// const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// const SHEET_ID = '1qpC5ibaBdicT-huMOuIXWtBGDyRF3ovpKQZFMRYjGuk';

// app.use(express.static(__dirname)); // Serve index.html etc.

// const auth = new google.auth.GoogleAuth({
//   keyFile: KEYFILEPATH,
//   scopes: SCOPES,
// });

// app.get('/data', async (req, res) => {
//   try {
//     const client = await auth.getClient();
//     const sheets = google.sheets({ version: 'v4', auth: client });

//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: SHEET_ID,
//       range: 'Sheet1',
//     });

//     const rows = response.data.values;
//     if (!rows || rows.length < 2) {
//       return res.status(404).json({ error: 'No data found' });
//     }

//     const headers = rows[0];
//     const lastRow = rows[rows.length - 1];

//     const rowData = {};
//     headers.forEach((h, i) => (rowData[h] = lastRow[i] || ''));

//     res.json(rowData);
//   } catch (err) {
//     console.error('❌ Server Error:', err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });


const express = require('express');
const { google } = require('googleapis');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname)); // Serve index.html
app.use(bodyParser.json());         // Parse JSON body

const KEYFILEPATH = './sheet-reader-xyz123.json';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const SHEET_ID = '1qpC5ibaBdicT-huMOuIXWtBGDyRF3ovpKQZFMRYjGuk';
const auth = new google.auth.GoogleAuth({ keyFile: KEYFILEPATH, scopes: SCOPES });


// ✅ Get Cell Data
app.get('/getCell', async (req, res) => {
  const cell = req.query.cell; // e.g., A1

  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `Sheet1!${cell}`,
    });

    const value = result.data.values ? result.data.values[0][0] : '';
    res.json({ value });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch cell value' });
  }
});


// ✅ Update Cell Data
app.post('/updateCell', async (req, res) => {
  const { cell, value } = req.body;

  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `Sheet1!${cell}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[value]],
      },
    });

    res.json({ message: '✅ Updated successfully' });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ error: 'Failed to update cell value' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
