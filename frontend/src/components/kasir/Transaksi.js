import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import numberWithCommas from "../../utils/utils";
import { Form } from "react-bootstrap";
import { BsCart4 } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";

function Transaksi({
  transaktion,
  namaPelanggan,
  transaktionP,
  tanggalTransaction,
  handleRemove,
}) {
  const navigate = useNavigate();
  const [grandTotal, setGrandTotal] = useState(0); // State untuk menyimpan grand total

  // Menghitung grand total saat ada perubahan pada transaksiP
  useEffect(() => {
    let total = 0;
    transaktionP.forEach((item) => {
      const harga = parseFloat(item.totalHarga);
      if (!isNaN(harga)) {
        total += harga;
      }
    });
    setGrandTotal(total);
  }, [transaktionP]);

  // Handle submit transaksi
  const handleTrans = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/penjualan", {
        namaPelanggan,
        tanggalTransaction,
      });

      console.log(res);

      transaktionP.forEach(async (item) => {
        await axios.post("http://localhost:5000/detail", {
          perawatanPelanggan: item.perawatanPelanggan,
          hargaP: item.hargaP,
          quantityP: item.quantityP,
          totalHarga: item.totalHarga,
          grandtotal: grandTotal, // Menggunakan grand total yang sudah dihitung
          idpenjualan: res.data.id,
        });
      });

      Swal.fire({
        title: "Penjualan Berhasil Ditambahkan",
        icon: "success",
      });
      navigate("/daftarpenjualan");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row>
      <Col>
        <Form onSubmit={(e) => handleTrans(e)}>
          {transaktion.map((item, i) => (
            <Card key={i} style={{ display: "none" }}>
              <CardBody>
                <Row>
                  <Col className="form-text">
                    <strong>Nama Pelanggan:</strong> {item.namaPelanggan}
                  </Col>
                  <Col className="form-text">
                    <strong>Tanggal:</strong> {item.tanggalTransaction}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          ))}
          <Card className="mt-3">
            <CardBody>
              <Table responsive className="text-center" size="sm">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Perawatan</th>
                    <th>Harga</th>
                    <th>Quantity</th>
                    <th>Total Harga</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {transaktionP.map((detail, index) => (
                    <tr key={detail.id}>
                      <td>{index + 1}</td>
                      <td>{detail.perawatanPelanggan}</td>
                      <td>Rp. {numberWithCommas(detail.hargaP)}</td>
                      <td>{detail.quantityP}</td>
                      <td>Rp. {numberWithCommas(detail.totalHarga)}</td>
                      <td
                        variant="button"
                        className="text-danger"
                        onClick={() => handleRemove(detail.id)}
                      >
                        <FaTrashCan className="fs-4 mb-1" type="button" />
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot className="fw-bold mt-3">
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Rp. {numberWithCommas(grandTotal)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </Table>
            </CardBody>
          </Card>
          <Row className="text-end mt-3">
            <Col>
              <Button variant="success" type="submit">
                <BsCart4 className="mb-1" /> Checkout
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default Transaksi;
