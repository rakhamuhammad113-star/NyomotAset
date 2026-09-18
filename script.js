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