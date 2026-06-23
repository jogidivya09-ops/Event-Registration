

// Wait until DOM is fully loaded

// === Section 1: Event Details Display ===
document.addEventListener("DOMContentLoaded", function () {
    const eventDetails = {
        'dance': { title: 'Dance Event', description: 'A vibrant and energetic dance event showcasing amazing performances.', venue: 'Main Auditorium', guests: 'Famous Choreographer XYZ', schedule: 'March 10, 2025 - 5:00 PM' },
        'mimicry': { title: 'Mimicry Event', description: 'A fun-filled mimicry event where participants imitate famous personalities.', venue: 'Drama Theatre', guests: 'Comedian ABC', schedule: 'March 11, 2025 - 4:00 PM' },
        'treasure-hunt': { title: 'Treasure Hunt', description: 'An adventurous treasure hunt where teams solve clues to find the prize.', venue: 'College Campus', guests: 'Adventure Expert DEF', schedule: 'March 12, 2025 - 3:00 PM' },
        'standup-comedy': { title: 'Stand-up Comedy Event', description: 'A hilarious stand-up comedy event featuring talented comedians.', venue: 'Open Air Theatre', guests: 'Comedian GHI', schedule: 'March 13, 2025 - 6:00 PM' },
        'singing-battle': { title: 'Singing Battle', description: 'A singing competition where participants showcase their vocal talents.', venue: 'Music Hall', guests: 'Singer JKL', schedule: 'March 14, 2025 - 7:00 PM' },
        'gaming-tournament': { title: 'Gaming Tournament', description: 'A competitive gaming tournament for esports enthusiasts.', venue: 'Computer Lab', guests: 'Pro Gamer PQR', schedule: 'March 16, 2025 - 5:30 PM' },
        'spell-be': { title: 'Spell Bee', description: 'A spelling competition to test participants’ vocabulary skills.', venue: 'Language Lab', guests: 'Linguist STU', schedule: 'March 10, 2025 - 5:00 PM' },
        'auto-expo': { title: 'Auto-Expo', description: 'A showcase of the latest automotive innovations and designs.', venue: 'Expo Hall', guests: 'Industry Experts', schedule: 'March 11, 2025 - 4:00 PM' },
        'photography': { title: 'Photography Competition', description: 'A competition for budding photographers to showcase their skills.', venue: 'Art Gallery', guests: 'Renowned Photographer VWX', schedule: 'March 12, 2025 - 3:00 PM' },
        'ramp-walk': { title: 'Ramp Walk', description: 'A fashion event featuring stylish outfits and stunning models.', venue: 'Grand Stage', guests: 'Fashion Designer YZ', schedule: 'March 13, 2025 - 6:00 PM' },
        'logo-quiz': { title: 'Logo Quiz', description: 'A fun quiz to test knowledge of famous brand logos.', venue: 'Quiz Arena', guests: 'Marketing Experts', schedule: 'March 16, 2025 - 5:30 PM' },
        'sports': { title: 'Sports Event', description: 'A thrilling sports competition across various disciplines.', venue: 'Sports Complex', guests: 'National Athletes', schedule: 'March 10, 2025 - 5:00 PM' },
        'stalls': { title: 'Food & Game Stalls', description: 'Exciting stalls featuring delicious food and fun games.', venue: 'College Grounds', guests: 'Food Bloggers & Game Hosts', schedule: 'March 11, 2025 - 4:00 PM' },
        'tuga-fire': { title: 'Tuga Fire Performance', description: 'A mesmerizing fire show performance by trained artists.', venue: 'Central Stage', guests: 'Fire Performers', schedule: 'March 12, 2025 - 3:00 PM' },
        'poster': { title: 'Poster Making Competition', description: 'A creative competition for artists to showcase their talent.', venue: 'Art Room', guests: 'Graphic Designer AAA', schedule: 'March 13, 2025 - 6:00 PM' },
        'coding': { title: 'Coding Contest', description: 'A programming competition to test coding skills and problem-solving abilities.', venue: 'Computer Lab', guests: 'Tech Experts', schedule: 'March 16, 2025 - 5:30 PM' }
    };

    function showEventDetails(eventId) {
        const eventInfo = eventDetails[eventId];
        if (eventInfo) {
            const eventDetailsSection = document.getElementById('event-details');
            eventDetailsSection.innerHTML = `
                <div id="event-info">
                    <h2>${eventInfo.title}</h2>
                    <p><strong>Description:</strong> ${eventInfo.description}</p>
                    <p><strong>Venue:</strong> ${eventInfo.venue}</p>
                    <p><strong>Guest:</strong> ${eventInfo.guests}</p>
                    <p><strong>Schedule:</strong> ${eventInfo.schedule}</p>
                    <button id="register-btn">Come on! Let's Participate and Have Fun!</button>
                </div>
            `;
            eventDetailsSection.style.display = 'block';

            setTimeout(() => {
                eventDetailsSection.scrollIntoView({ behavior: 'smooth' });
            }, 300);

            document.getElementById("register-btn").addEventListener("click", function () {
                redirectToRegister(eventInfo.title);
            });
        }
    }

    function redirectToRegister(eventTitle) {
        window.location.href = `register.html?event=${encodeURIComponent(eventTitle)}`;
    }

    document.querySelectorAll(".event-card").forEach(card => {
        card.addEventListener("click", function () {
            const eventId = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            showEventDetails(eventId);
        });
    });
});

// === Section 2: Registration Page Script ===
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedEvent = urlParams.get("event");
    if (selectedEvent) {
        document.getElementById("selectedEvent").value = selectedEvent;
        const storedParticipants = JSON.parse(localStorage.getItem(`participants-${selectedEvent}`) || "[]");
        const participantList = document.getElementById("participantsList");
        storedParticipants.forEach(p => {
            const listItem = document.createElement("li");
            listItem.textContent = `${p.name} (${p.department}, ${p.rollNo}) - ${selectedEvent}`;
            participantList.appendChild(listItem);
        });
    }

    document.getElementById("registrationForm")?.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const rollNo = document.getElementById("rollNo").value;
        const department = document.getElementById("department").value;
        const selectedEvent = document.getElementById("selectedEvent").value;

        if (name && email && rollNo && department && selectedEvent) {
            let registeredCount = parseInt(localStorage.getItem(`registered-${selectedEvent}`) || "0", 10);
            const limit = 50;

            if (registeredCount < limit) {
                registeredCount++;
                localStorage.setItem(`registered-${selectedEvent}`, registeredCount);

                const newParticipant = { name, email, rollNo, department };
                let participants = JSON.parse(localStorage.getItem(`participants-${selectedEvent}`) || "[]");
                participants.push(newParticipant);
                localStorage.setItem(`participants-${selectedEvent}`, JSON.stringify(participants));

                const listItem = document.createElement("li");
                listItem.textContent = `${name} (${department}, ${rollNo}) - ${selectedEvent}`;
                document.getElementById("participantsList").appendChild(listItem);

                const qrData = `Event: ${selectedEvent}\nName: ${name}\nRoll No: ${rollNo}\nDepartment: ${department}`;
                document.getElementById("qrcode").innerHTML = "";
                new QRCode(document.getElementById("qrcode"), {
                    text: qrData,
                    width: 200,
                    height: 200,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });

                document.getElementById("successMessage").style.display = "block";
                document.getElementById("registrationForm").reset();
            } else {
                alert("Registration full! No more slots available.");
            }
        }
    });
});

// === Section 3: Dark Mode & Search Filter ===
document.getElementById("toggleDark")?.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});

const searchInput = document.getElementById("searchInput");
if (searchInput) {
    searchInput.addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase();
        document.querySelectorAll(".event-card").forEach(card => {
            const text = card.innerText.toLowerCase();
            card.style.display = text.includes(searchTerm) ? "block" : "none";
        });
    });
}
