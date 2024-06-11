const Usaha = require('../models/usaha_model');
const Financial = require('../models/financial_model')
const stream = require('stream')
const csvParser = require('csv-parser')

const getAllFinancialByUsahaId = async (req, res) => {
  try {
    const items = await Financial.findAllBy('usaha_id', req.params.usahaId);
    res.status(200).json({ code: 200, status: "success", data: items });
  } catch (error) {
    res.status(500).json({ code: 500, status: "error", message: error.message });
  }
}

const getFinancialById = async (req, res) => {
  try {
    const item = await Financial.findById(req.params.financialId);
    res.status(200).json({ code: 200, status: "success", data: item });
  } catch (error) {
    res.status(500).json({ code: 500, status: "error", message: error.message });
  }
}

const addUsahaFinancial = async (req, res) => {
  try {
    const { tipe, jumlah } = req.body;
    const financial = await Financial.add(req.body);
    const usaha = await Usaha.findById(req.body.usaha_id);
    usaha.financials.push({ id: financial.id })



    if (tipe == "pengeluaran") {
      usaha.total_pengeluaran += jumlah;
      usaha.balance -= jumlah;
    } else {
      usaha.total_pemasukan += jumlah;
      usaha.balance += jumlah;
    }

    await Usaha.edit(req.body.usaha_id, usaha);

    res.status(201).json({ code: 201, status: "created", data: { id: financial.id } });
  } catch (error) {
    res.status(500).json({ code: 500, status: "error", message: error.message });
  }
}

const editUsahaFinancial = async (req, res) => {
  try {
    const financial = await Financial.edit(req.params.financialId, req.body);
    res.status(200).json({ code: 200, status: "edited", data: financial });
  } catch (error) {
    res.status(500).json({ code: 500, status: "error", message: error.message });
  }
}

const deleteUsahaFinancial = async (req, res) => {
  try {
    await Financial.delete(req.params.financialId);
    res.status(200).json({ code: 200, status: "deleted", data: req.params.financialId });
  } catch (error) {
    res.status(500).json({ code: 500, status: "error", message: error.message });
  }
}

const getWeeklyFinancial = async (req, res) => {
  try {
    const items = await Financial.getWeeklyFinancial(req.params.usahaId);
    res.status(200).json({ code: 200, status: "success", data: items });
  } catch (error) {
    res.status(500).json({ code: 500, status: "error", message: error.message });
  }
}

const addUsahaFinancialFromFile = async (req, res) => {
  const financials_id = [];
  try {
    let i = 0;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ code: 400, status: "error", message: "No file uploaded." });
    } else if (file.mimetype != 'text/csv') {
      return res.status(400).json({ code: 400, status: "error", message: "File must be in CSV format." });
    }

    const data_csv = [];
    const readStream = new stream.PassThrough();
    readStream.end(file.buffer);

    readStream
      .pipe(csvParser())
      .on('data', (data) => {
        data_csv.push(data);
      })
      .on('end', async () => {
        try {
          const { usaha_id } = req.body;
          console.log(usaha_id)
          const usaha = await Usaha.findById(usaha_id);
          if (!usaha) {
            return res.status(404).json({ code: 404, status: "error", message: "Usaha not found." });
          }

          for (const record of data_csv) {
            i++;
            const { tanggal, pemasukan, pengeluaran, deskripsi_pemasukan, deskripsi_pengeluaran, title_pengeluaran, title_pemasukan } = record;

            const data_masuk = await Financial.add({ usaha_id: req.body.usaha_id, tipe: 'pemasukan', jumlah: pemasukan, tanggal, title: title_pemasukan, description: deskripsi_pemasukan });
            await usaha.financials.push({ id: data_masuk.id })
            financials_id.push(data_masuk.id)
            usaha.total_pemasukan += parseInt(pemasukan);
            usaha.balance += parseInt(pemasukan);
            
            const data_keluar = await Financial.add({ usaha_id: req.body.usaha_id, tipe: 'pengeluaran', jumlah: pengeluaran, tanggal, title: title_pengeluaran, description: deskripsi_pengeluaran });
            await usaha.financials.push({ id: data_keluar.id })
            financials_id.push(data_keluar.id)
            usaha.total_pengeluaran += parseInt(pengeluaran);
            usaha.balance -= parseInt(pengeluaran);
            console.log("Data ke-", i, " berhasil ditambahkan")
          }
          await Usaha.edit(usaha_id, usaha);
          res.status(201).json({ code: 201, status: "created", data: { message:"created", total_fianncial_data_created: i*2, data_id: financials_id } });
        } catch (error) {
          if (financials_id.length > 0) {
            for (const id of financials_id) {
              await Financial.delete(id);
            }
          }
          res.status(500).json({ code: 500, status: "error", message: error.message });
          console.log("Error ketika mengakses: ", error.message)
        }
      })
  } catch (error) {
    if (financials_id.length > 0) {
      for (const id of financials_id) {
        await Financial.delete(id);
      }
    }
    res.status(500).json({ code: 500, status: "error", message: error.message });
  }

}

const forecasting = async (req, res) => {
  try {
    const items = await Financial.forecasting(req.params.usahaId);
    res.status(200).json({ code: 200, status: "success", data: items });
  } catch (error) {
    res.status(500).json({ code: 500, status: "error", message: error.message });
  }

}


module.exports = {
  getAllFinancialByUsahaId,
  addUsahaFinancial,
  getFinancialById,
  editUsahaFinancial,
  deleteUsahaFinancial,
  getWeeklyFinancial,
  addUsahaFinancialFromFile,
  forecasting
}