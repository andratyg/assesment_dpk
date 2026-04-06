let daftarLagu = [];
let indeksEdit = null;

function tampilkanLagu() {
  const daftar = document.getElementById("playlist");
  daftar.innerHTML = "";

  daftarLagu.forEach((lagu, indeks) => {
    const baris = document.createElement("tr");
    const statusFav = lagu.favorit ? "Ya" : "Tidak";

    baris.innerHTML = `
      <td>${lagu.id}</td> 
      <td>${lagu.waktu}</td>
      <td>${lagu.judul}</td>
      <td>${lagu.penyanyi}</td>
      <td>${lagu.genre}</td>
      <td>${statusFav}</td>
      <td>
        <button onclick="ubahLagu(${indeks})">Ubah</button>
        <button onclick="hapusLagu(${indeks})">Hapus</button>
      </td>
    `;

    daftar.appendChild(baris);
  });
}

function submitLagu() {
  const judul = document.getElementById("judul").value.trim().toUpperCase();
  const penyanyi = document.getElementById("penyanyi").value.trim();
  const genre = document.getElementById("genre").value.trim();
  const favorit = document.getElementById("favorit").checked;
  const tombolSubmit = document.getElementById("btnSubmit");

  if (!judul || !penyanyi) {
    alert("Judul dan penyanyi harus diisi!");
    return;
  }

  const dataLagu = {
    id: Math.floor(Math.random() * 1000),
    waktu: new Date().toLocaleString(),
    judul,
    penyanyi,
    genre,
    favorit,
  };

  if (indeksEdit !== null) {
    daftarLagu[indeksEdit] = dataLagu;
    indeksEdit = null;
    tombolSubmit.innerText = "Tambah";
  } else {
    daftarLagu.push(dataLagu);
  }

  resetForm();
  tampilkanLagu();
}

function hapusLagu(indeks) {
  daftarLagu.splice(indeks, 1);
  tampilkanLagu();
}

function ubahLagu(indeks) {
  const lagu = daftarLagu[indeks];

  document.getElementById("judul").value = lagu.judul;
  document.getElementById("penyanyi").value = lagu.penyanyi;
  document.getElementById("genre").value = lagu.genre;
  document.getElementById("favorit").checked = lagu.favorit;

  indeksEdit = indeks;
  document.getElementById("btnSubmit").innerText = "Simpan";
}

function resetForm() {
  document.getElementById("judul").value = "";
  document.getElementById("penyanyi").value = "";
  document.getElementById("genre").value = "";
  document.getElementById("favorit").checked = false;
}
