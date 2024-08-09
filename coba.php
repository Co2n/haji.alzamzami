<?php
// Inisialisasi array
$a = array();

// Mengirim entri teks
$obj1 = new stdClass();
$obj1->type = 0; // teks
$obj1->content = 'My Title'; // string apa saja
$obj1->bold = 1; // 0 jika tidak, 1 jika ya
$obj1->align = 2; // 0 jika kiri, 1 jika tengah, 2 jika kanan
$obj1->format = 3; // 0 jika normal, 1 jika tinggi ganda, 2 jika tinggi + lebar ganda, 3 jika lebar ganda, 4 jika kecil
array_push($a, $obj1);

// Mengirim entri gambar
$obj2 = new stdClass();
$obj2->type = 1; // gambar
$obj2->path = 'https://www.mydomain.com/image.jpg'; // jalur lengkap di server web Anda; pastikan ukurannya tidak besar
$obj2->align = 2; // 0 jika kiri, 1 jika tengah, 2 jika kanan; atur kiri untuk gambar berukuran besar
array_push($a, $obj2);

// Mengirim entri barcode
$obj3 = new stdClass();
$obj3->type = 2; // barcode
$obj3->value = '1234567890123'; // nilai barcode yang valid
$obj3->height = 50; // tinggi barcode yang valid 10 hingga 80
$obj3->align = 0; // 0 jika kiri, 1 jika tengah, 2 jika kanan
array_push($a, $obj3);

// Mengirim entri QR
$obj4 = new stdClass();
$obj4->type = 3; // kode QR
$obj4->value = 'sample qr text'; // nilai kode QR yang valid
$obj4->size = 40; // ukuran kode QR yang valid dalam mm (Min 40)
$obj4->align = 2; // 0 jika kiri, 1 jika tengah, 2 jika kanan
array_push($a, $obj4);

// Mengirim baris kosong
$obj6 = new stdClass();
$obj6->type = 0; // teks
$obj6->content = ' '; // baris kosong
$obj6->bold = 0;
$obj6->align = 0;
array_push($a, $obj6);

// Mengirim teks multi baris
$obj7 = new stdClass();
$obj7->type = 0; // teks
$obj7->content = 'This text has<br />two lines'; // teks multi baris
$obj7->bold = 0;
$obj7->align = 0;
array_push($a, $obj7);

echo json_encode($a, JSON_FORCE_OBJECT);
?>