        const inputPencarian = document.getElementById('input-pencarian');
        
        inputPencarian.addEventListener('keyup', function(e) {
            const keyword = e.target.value.toLowerCase();
            const semuaEtalase = document.querySelectorAll('.etalase');

            semuaEtalase.forEach(etalase => {
                const teksEtalase = etalase.innerText.toLowerCase();
                if (teksEtalase.includes(keyword)) {
                    etalase.style.display = "block";
                } else {
                    etalase.style.display = "none";
                }
            });
        });

        const tombolTema = document.getElementById('tombol-tema');
        
        tombolTema.addEventListener('click', function() {
            // Nambahin atau mangkas class 'dark-mode' di tag body
            document.body.classList.toggle('dark-mode');
            
            // Ganti teks tombol sesuai kondisi tema saat ini
            if (document.body.classList.contains('dark-mode')) {
                tombolTema.innerHTML = "☀️ Mode Terang";
                tombolTema.style.backgroundColor = "#ff6b6b";
            } else {
                tombolTema.innerHTML = "🌙 Ubah Mode";
                tombolTema.style.backgroundColor = "#2b2b2b";
            }
        });