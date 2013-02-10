
## Clone dari git

	$ git clone git@github.com:i3owow/tugasWorkshopCloudcomputing.git


## Menjalankan di localhost
	
	Jalankan server lokal

    $ node app

    Jalankan server mongodb

    $ mongod --dbpath <path_data>

    Panggil url http://localhost/ dari bowser untuk membuka default page.

## Memakai Aplikasi

	BUka halaman CDRUD bisa dengan :
	1. Dari default page tekan link "Click disini untuk memulai"
	2. Panggil url http://localhost/crud dari bowser

	Untuk membuat data employee baru click "Create New" dan isi form yang muncul dan click "Save" untuk menyimpan. untuk membatalkan pembuatan click "Cancel".
	Untuk mengubah data employee yang telah ada click "Edit" dan isi modifikasi form yang muncul dan click "Update" untuk menyimpan perubahan, untuk membatalkan click "Cancel".
	Untuk menghapus data employee yang telah ada click "Remove".

## Database

	database : "company"
	collection : "employees"

	> use company
	> db.employees.save( { id : "<employee id>", name : "<employees name>", department : "<employee department>", salary : "<employee salary>" } )
