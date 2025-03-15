'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Header from './component/header';

import EsBlewah from '@/assets/es-blewah.jpg';
import EsCampur from '@/assets/es-campur.webp';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';

interface OrderanProps {
  nomor: number;
  esBlewah: number;
  esCampur: number;
  catatan: string;
  status: boolean;
  dateTime: string;
}

export default function Main() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [nomor, setNomor] = useState<number | null>(null);
  const [esBlewah, setEsBlewah] = useState(0);
  const [esCampur, setEsCampur] = useState(0);
  const [catatan, setCatatan] = useState('');
  const [orderan, setOrderan] = useState<OrderanProps[]>([]);

  const handleEsBlewah = () => {
    setEsBlewah(esBlewah + 1);
  };

  const handleEsBlewahKurang = () => {
    if (esBlewah > 0) {
      setEsBlewah(esBlewah - 1);
    }
  };

  const handleEsCampur = () => {
    setEsCampur(esCampur + 1);
  };

  const handleEsCampurKurang = () => {
    if (esCampur > 0) {
      setEsCampur(esCampur - 1);
    }
  };

  const formatUang = (value: number) => {
    return value.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
  };

  const formatWaktu = (value: string | Date) => {
    const date = new Date(value);

    const detik = date.getSeconds().toString().padStart(2, '0');
    const jam = date.getHours().toString().padStart(2, '0');
    const menit = date.getMinutes().toString().padStart(2, '0');
    const hari = date.getDate().toString().padStart(2, '0');

    const bulan = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ][date.getMonth()];

    const tahun = date.getFullYear();

    return `${jam}:${menit}:${detik}, ${hari} ${bulan} ${tahun}`;
  };

  const handleOrder = () => {
    const newOrder = {
      nomor: orderan.length + 1,
      esBlewah,
      esCampur,
      catatan,
      status: false,
      dateTime: new Date().toLocaleString(),
    };
    setOrderan([...orderan, newOrder]);
    setEsBlewah(0);
    setEsCampur(0);
    setCatatan('');
  };

  const handleHapusOrder = (nomor: number) => {
    const updatedOrderan = orderan.filter((order) => order.nomor !== nomor);
    setOrderan(updatedOrderan);
  };

  const handleEditMode = (item: OrderanProps) => {
    const order = orderan.find((order) => order.nomor === item.nomor);
    if (order) {
      setNomor(order.nomor);
      setEsBlewah(order.esBlewah);
      setEsCampur(order.esCampur);
      setCatatan(order.catatan);
      setIsEditMode(true);
      // scroll to #form
      const form = document.getElementById('form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBatalEditMode = () => {
    setEsBlewah(0);
    setEsCampur(0);
    setCatatan('');
    setNomor(null);
    setIsEditMode(false);
  };

  const handleEditOrder = () => {
    const updatedOrderan = orderan.map((order) => {
      if (order.nomor === nomor) {
        return {
          ...order,
          esBlewah,
          esCampur,
          catatan,
        };
      }
      return order;
    });
    setOrderan(updatedOrderan);
    setEsBlewah(0);
    setEsCampur(0);
    setCatatan('');
    setNomor(null);
    setIsEditMode(false);
  };

  return (
    <>
      <main className="flex min-h-screen w-full flex-col items-center px-6 md:px-20 lg:px-40 py-10 bg-[#FFCDB2]">
        <Header />
        {/* Section Tambah Orderan */}
        <div
          id="form"
          className="flex flex-col items-stretch border bg-white border-2 border-[#EB5A3C] w-full lg:max-w-2xl mt-10 min-h-16 rounded-2xl p-4 gap-8"
        >
          <div
            className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between
"
          >
            <div className="flex grow items-center gap-4">
              <Image
                src={EsBlewah}
                alt="Es Blewah"
                className="w-24 sm:w-28 h-24 sm:h-28 object-cover rounded-xl"
              />
              <div className="flex flex-col grow">
                <p className="text-2xl font-bold text-[#EB5A3C]">Es Blewah</p>
                <p className="text-lg text-[#DF9755]">Rp. 5.000</p>
                <p className="text-lg text-[#EB5A3C]">
                  Jumlah : <span className="font-bold">{esBlewah}</span>
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleEsBlewah}
                    className="bg-[#EB5A3C] grow text-white px-4 py-2 rounded-lg mt-2 cursor-pointer hover:bg-[#eb593ce7] "
                  >
                    +
                  </button>
                  <button
                    onClick={handleEsBlewahKurang}
                    className="bg-[#EB5A3C] grow text-white px-4 py-2 rounded-lg mt-2 cursor-pointer hover:bg-[#eb593ce7] "
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
            <div className="flex grow items-center gap-4">
              <Image
                src={EsCampur}
                alt="Es Campur"
                className="w-24 sm:w-28 h-24 sm:h-28 object-cover rounded-xl"
              />
              <div className="flex flex-col grow">
                <p className="text-2xl font-bold text-[#EC7FA9]">Es Campur</p>
                <p className="text-lg text-[#FFB8E0]">Rp. 5.000</p>
                <p className="text-lg text-[#EC7FA9]">
                  Jumlah : <span className="font-bold">{esCampur}</span>
                </p>
                <div className="flex flex-row gap-2">
                  <button
                    onClick={handleEsCampur}
                    className="bg-[#EC7FA9] grow text-white px-4 py-2 rounded-lg mt-2 cursor-pointer hover:bg-[#eC7FA9e5] "
                  >
                    +
                  </button>
                  <button
                    onClick={handleEsCampurKurang}
                    className="bg-[#EC7FA9] grow text-white px-4 py-2 rounded-lg mt-2 cursor-pointer hover:bg-[#eC7FA9e5] "
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg text-[#EB5A3C]" htmlFor="catatan">
              Catatan
            </label>
            {/* disable expand textarea */}
            <textarea
              name="catatan"
              id="catatan"
              onChange={(e) => setCatatan(e.target.value)}
              value={catatan}
              className="w-full h-24 border border-2 border-[#EB5A3C] rounded-lg p-4 text-[#EB5A3C] focus:outline-none resize-none"
            ></textarea>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <p className="text-lg text-[#EB5A3C]">
                Total Harga :{' '}
                <span className="font-bold">
                  {formatUang(esBlewah * 5000 + esCampur * 5000)}
                </span>
              </p>
            </div>
            <div>
              <button
                onClick={isEditMode ? handleEditOrder : handleOrder}
                className="bg-[#EB5A3C] text-white px-4 py-2 rounded-lg w-full cursor-pointer hover:bg-[#eb593ce7]"
              >
                {isEditMode ? 'Edit Orderan' : 'Tambah Orderan'}
              </button>
              {isEditMode && (
                <button
                  onClick={handleBatalEditMode}
                  className="bg-[#EB5A3C] text-white px-4 py-2 rounded-lg w-full cursor-pointer hover:bg-[#eb593ce7] mt-4"
                >
                  Batal
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Section List Orderan */}
        <div className="flex flex-col items-stretch border bg-white border-2 border-[#EB5A3C] w-full lg:max-w-2xl mt-10 min-h-16 rounded-2xl p-4 gap-8">
          <div className="flex flex-col gap-2 ">
            <p className="text-2xl font-bold text-[#EB5A3C]">List Orderan</p>
            <p className="text-lg font-medium text-[#EB5A3C]">
              Total Pendapatan :{' '}
              {formatUang(
                orderan.reduce(
                  (total, order) =>
                    total + order.esBlewah * 5000 + order.esCampur * 5000,
                  0
                )
              )}
            </p>
          </div>
          {orderan
            .slice(0)
            .reverse()
            .map((order, index) => (
              <div
                key={index}
                className="flex flex-col items-stretch border border-2 border-[#EB5A3C] min-w-full min-h-16 rounded-2xl p-4 gap-4 bg-[#FFEDFA]"
              >
                <div className="flex flex-row justify-between gap-2 flex-wrap">
                  <p className="text-xl font-bold text-[#EB5A3C]">
                    Orderan ke-{order.nomor}
                  </p>
                  <span className="text-lg font-bold text-[#EB5A3C]">
                    {formatUang(order.esBlewah * 5000 + order.esCampur * 5000)}
                  </span>
                </div>
                <p className="text-lg text-[#EB5A3C]">
                  {formatWaktu(order.dateTime)}
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2">
                    <p className="text-lg text-[#EB5A3C]">
                      Jumlah Es Blewah :{' '}
                    </p>
                    <p className="text-lg font-medium text-[#EB5A3C]">
                      {order.esBlewah}
                    </p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="text-lg text-[#EB5A3C]">
                      Jumlah Es Campur :{' '}
                    </p>
                    <p className="text-lg font-medium text-[#EB5A3C]">
                      {order.esCampur}
                    </p>
                  </div>
                  {order.catatan && (
                    <div className="flex flex-col gap-2">
                      <p className="text-lg text-[#EB5A3C]">Catatan : </p>
                      <p className="text-lg font-medium text-[#EB5A3C]">
                        {order.catatan}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() => handleEditMode(order)}
                    className="bg-[#EB5A3C] text-white px-4 py-2 rounded-lg w-full cursor-pointer hover:bg-[#eb593ce7]"
                  >
                    Edit Order
                  </button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="bg-[#BE5985] text-white px-4 py-2 rounded-lg w-full cursor-pointer hover:bg-[#be5985d2]">
                        Hapus Order
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Hapus Order</DialogTitle>
                        <DialogDescription>
                          Apakah anda yakin ingin menghapus orderan ini?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <button
                            className="bg-[#BE5985] text-white px-4 py-2 rounded-lg w-full cursor-pointer hover:bg-[#be5985d2]"
                            onClick={() => {
                              handleHapusOrder(order.nomor);
                            }}
                          >
                            Hapus
                          </button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
