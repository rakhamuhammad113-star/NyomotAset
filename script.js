// === SCRIPT UTAMA NYOMOTASET ===

// 1. Fungsi Toggle Dark/Light Mode
function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('themeToggle');
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        themeBtn.innerText = "🌙 Gelap";
    } else {
        themeBtn.innerText = "☀️ Terang";
    }
}

// 2. Fungsi Live Search & Filter Kategori (Khusus assets.html)
document.addEventListener("DOMContentLoaded", function () {
    const searchBox = document.getElementById('searchBox');
    
    if (searchBox) {
        const assetGrid = document.getElementById('assetGrid');
        const assetCards = assetGrid.getElementsByClassName('asset-card');
        let currentCategory = 'all';

        window.filterCategory = function(category) {
            currentCategory = category;
            const buttons = document.querySelectorAll('.filter-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            applyFilter();
        }

        function applyFilter() {
            const keyword = searchBox.value.toLowerCase();
            for (let i = 0; i < assetCards.length; i++) {
                const card = assetCards[i];
                const title = card.getElementsByTagName('h3')[0].textContent.toLowerCase();
                const cardCategory = card.getAttribute('data-category');

                const matchesCategory = (currentCategory === 'all' || cardCategory === currentCategory);
                const matchesSearch = title.includes(keyword);

                if (matchesCategory && matchesSearch) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            }
        }

        searchBox.addEventListener('keyup', applyFilter);
    }
});

// 3. Fungsi Modal / Pop-up Detail Aset
function openModal(title, category, format) {
    const modalTitle = document.getElementById('modalTitle');
    if (modalTitle) {
        modalTitle.innerText = title;
        document.getElementById('modalCategory').innerText = category;
        document.getElementById('modalFormat').innerText = format;
        document.getElementById('assetModal').style.display = "flex";
    }
}

function closeModal() {
    const modal = document.getElementById('assetModal');
    if (modal) {
        modal.style.display = "none";
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('assetModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// 4. Fungsi Formulir Unggah Aset (Khusus upload.html)
function handleUpload(event) {
    event.preventDefault();
    alert("Terima kasih! Aset berhasil diajukan dan akan ditinjau oleh administrator.");
    document.getElementById('uploadForm').reset();
}
// Data contoh aset (sesuaikan dengan data yang kamu miliki)
    const dataAset = [
        { id: 1, nama: "Karakter Hero 3D", kategori: "karakter", tanggal: "2023-10-01" },
        { id: 2, nama: "Suara Bel Sekolah", kategori: "audio", tanggal: "2023-10-05" },
        { id: 3, nama: "Karakter Villain", kategori: "karakter", tanggal: "2023-10-02" }
    ];

    const inputSearch = document.getElementById('searchBox');
    const selectSort = document.getElementById('sort_filter');
    // Pastikan kamu punya div dengan id="hasil_pencarian" di bawah tombol kategori
    const tempatHasil = document.getElementById('hasil_pencarian'); 

    function tampilkanData() {
        const keyword = inputSearch.value.toLowerCase();
        const sort = selectSort.value;

        // Filter berdasarkan pencarian
        let hasilFilter = dataAset.filter(aset => 
            aset.nama.toLowerCase().includes(keyword)
        );

        // Sorting
        if (sort === 'terbaru') {
            hasilFilter.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
        } else if (sort === 'terlama') {
            hasilFilter.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
        } else if (sort === 'az') {
            hasilFilter.sort((a, b) => a.nama.localeCompare(b.nama));
        } else if (sort === 'za') {
            hasilFilter.sort((a, b) => b.nama.localeCompare(a.nama));
        }

        // Render HTML
        tempatHasil.innerHTML = '';
        if (hasilFilter.length === 0) {
            tempatHasil.innerHTML = '<p>Aset tidak ditemukan.</p>';
            return;
        }

        hasilFilter.forEach(aset => {
            tempatHasil.innerHTML += `
                <div class="aset-item">
                    <h3>${aset.nama}</h3>
                    <p>Kategori: ${aset.kategori}</p>
                </div>
            `;
        });
    }

    // Jalankan event listener
    inputSearch.addEventListener('input', tampilkanData);
    selectSort.addEventListener('change', tampilkanData);
    tampilkanData();