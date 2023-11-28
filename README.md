# Selamat Datang di " Bookshelf API" - Aplikasi Back End Bookshelf
" Bookshelf API" adalah aplikasi back-end untuk bookshelf apps yang dibuat sebagai bagian dari submission untuk program Dicoding. 
Aplikasi ini merupakan RESTful API yang telah dilakukan beberapa pengujian agar dapat digunakan pada bookshelf apps.

# Fitur Utama
•	API dapat menyimpan buku: 

Method : POST

URL : /books

Body Request:

{

    "name": string,
    
    "year": number,
    
    "author": string,
    
    "summary": string,
    
    "publisher": string,
    
    "pageCount": number,
    
    "readPage": number,
    
    "reading": boolean
    
}

•	API dapat menampilkan seluruh buku: 

Method : GET

URL : /books

•	API dapat menampilkan detail buku: 

Method : GET

URL : /books/{bookId}

•	API dapat mengubah data buku: 

Method : PUT

URL : /books/{bookId}

Body Request:

{

    "name": string,
    
    "year": number,
    
    "author": string,
    
    "summary": string,
    
    "publisher": string,
    
    "pageCount": number,
    
    "readPage": number,
    
    "reading": boolean
    
}

•	API dapat menghapus buku: 

Method : DELETE

URL : /books/{bookId}

•	Uji Fungsionalitas: Proyek ini telah melalui serangkaian pengujian untuk memastikan bahwa fitur-fitur kunci dengan menggunakan Postman. 
Berkas pengujian dapat diunduh pada link berikut; https://github.com/dicodingacademy/a261-backend-pemula-labs/raw/099-shared-files/BookshelfAPITestCollectionAndEnvironment.zip
