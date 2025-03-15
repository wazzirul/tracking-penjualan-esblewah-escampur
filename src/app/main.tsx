'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Header from './component/header';

import EsBlewah from '@/assets/es-blewah.jpg';
import EsCampur from '@/assets/es-campur.webp';

interface OrderanProps {
  nomor: number;
  esBlewah: number;
  esCampur: number;
  catatan: string;
  status: boolean;
  dateTime: string;
}

export default function Main() {
  const [esBlewah, setEsBlewah] = useState(0);
  const [esCampur, setEsCampur] = useState(0);
  const [catatan, setCatatan] = useState('');
  const [orderan, setOrderan] = useState<OrderanProps[]>([]);

  const handleEsBlewah = () => {
    setEsBlewah(esBlewah + 1);
  };

  const handleEsCampur = () => {
    setEsCampur(esCampur + 1);
  };

  const formatUang = (value: number) => {
    return value.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
  };

  const formatWaktu = (value: string) => {
    return new Date(value).toLocaleString();
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
  return (
    <>
      <main className="flex min-h-screen w-full flex-col items-center px-6 md:px-20 lg:px-40 py-10 bg-[#FFCDB2]">
        <Header />
        {/* Section Tambah Orderan */}
        <div className="flex flex-col items-stretch border bg-white border-2 border-[#EB5A3C] w-full lg:max-w-2xl mt-10 min-h-16 rounded-2xl p-4 gap-8">
          <div
            className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between
"
          >
            <div className="flex grow items-center gap-4">
              <Image
                src={EsBlewah}
                alt="Es Blewah"
                className="w-28 h-28 object-cover rounded-xl"
              />
              <div className="flex flex-col grow">
                <p className="text-2xl font-bold text-[#EB5A3C]">Es Blewah</p>
                <p className="text-lg text-[#DF9755]">Rp. 5.000</p>
                <p className="text-lg text-[#EB5A3C]">
                  Jumlah : <span className="font-bold">{esBlewah}</span>
                </p>
                <button
                  onClick={handleEsBlewah}
                  className="bg-[#EB5A3C] text-white px-4 py-2 rounded-lg mt-2 cursor-pointer hover:bg-[#eb593ce7] "
                >
                  Tambah
                </button>
              </div>
            </div>
            <div className="flex grow items-center gap-4">
              <Image
                src={EsCampur}
                alt="Es Campur"
                className="w-28 h-28 object-cover rounded-xl"
              />
              <div className="flex flex-col grow">
                <p className="text-2xl font-bold text-[#EC7FA9]">Es Campur</p>
                <p className="text-lg text-[#FFB8E0]">Rp. 5.000</p>
                <p className="text-lg text-[#EC7FA9]">
                  Jumlah : <span className="font-bold">{esCampur}</span>
                </p>
                <button
                  onClick={handleEsCampur}
                  className="bg-[#EC7FA9] text-white px-4 py-2 rounded-lg mt-2 cursor-pointer hover:bg-[#eC7FA9e5] "
                >
                  Tambah
                </button>
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
                onClick={handleOrder}
                className="bg-[#EB5A3C] text-white px-4 py-2 rounded-lg w-full cursor-pointer hover:bg-[#eb593ce7]"
              >
                Tambah Orderan
              </button>
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
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
