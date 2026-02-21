const initialJobs = [
    {id: 1, companyName: "Google", position: "Frontend Developer", location: "Mountain View, CA", type: "Full-Time", salary: "$140k-$160k", description: "Develop and scale responsive web applications using modern JavaScript frameworks.", status: "pending"},
    {id: 2, companyName: "Microsoft", position: "Backend Developer", location: "Mountain View, CA", type: "Full-Time", salary: "$140k-$160k", description: "Develop and scale responsive web applications using modern JavaScript frameworks.", status: "pending"},
    {id: 3, companyName: "Meta", position: "Fullstack Developer", location: "Mountain View, CA", type: "Full-Time", salary: "$140k-$160k", description: "Develop and scale responsive web applications using modern JavaScript frameworks.", status: "pending"},
    {id: 4, companyName: "Apple", position: "Hardware Engineer", location: "Mountain View, CA", type: "Full-Time", salary: "$140k-$160k", description: "Develop and scale responsive web applications using modern JavaScript frameworks.", status: "pending"},
    {id: 5, companyName: "Amazon", position: "Software Engineer", location: "Mountain View, CA", type: "Full-Time", salary: "$140k-$160k", description: "Develop and scale responsive web applications using modern JavaScript frameworks.", status: "pending"},
    {id: 6, companyName: "Netflix", position: "Product Designer", location: "Mountain View, CA", type: "Full-Time", salary: "$140k-$160k", description: "Develop and scale responsive web applications using modern JavaScript frameworks.", status: "pending"},
    {id: 7, companyName: "Tesla", position: "UX Researcher", location: "Mountain View, CA", type: "Full-Time", salary: "$140k-$160k", description: "Develop and scale responsive web applications using modern JavaScript frameworks.", status: "pending"},
    {id: 8, companyName: "Spotify", position: "Product Manager", location: "Mountain View, CA", type: "Full-Time", salary: "$140k-$160k", description:"Develop and scale responsive web applications using modern JavaScript frameworks.", status: "pending"},
];

let jobs = [...initialJobs];
let currentTab = 'all';

function updateDashboard(){
    const total = jobs.length;
    const interviewCount = jobs.filter(job => job.status === 'interview').length;
    const rejectedCount = jobs.filter(job => job.status === 'rejected').length;

    document.getElementById('count-total').textContent = total;
    document.getElementById('count-job').textContent = total;
    document.getElementById('count-interview').textContent = interviewCount;
    document.getElementById('count-rejected').textContent = rejectedCount;

    let filteredJobs = jobs;
    if(currentTab === 'interview') {
        filteredJobs = jobs.filter(job => job.status === 'interview');
    }
    else if(currentTab === 'rejected') {
        filteredJobs = jobs.filter(job => job.status === 'rejected');
        document.getElementById('tab-badge').innerText = filteredJobs.length;
    }
}

function switchTab(tab) {
    currentTab = tab;
    
    ['all', 'interview', 'rejected'].forEach(t => {
        const btn = document.getElementById(`tab-${t}`);
        if(t === tab) {
            btn.classList.add('tab-active');
            btn.classList.remove('text-slate-600');
        } else {
            btn.classList.remove('tab-active');
            btn.classList.add('text-slate-600');
        }
    });
    renderJobs();
}

function updateStatus(id, newStatus){
    const job = jobs.find(j => j.id === id);
    job.status = newStatus;
    updateDashboard();
    renderJobs();
}

function deleteJob(id){
    jobs = jobs.filter(j => j.id !== id);
    updateDashboard();
    renderJobs();
}

function renderJobs(){
    const container = document.getElementById('jobs-container');
    const emptyState = document.getElementById('empty-state');
    container.innerHTML = '';

    let filtered = jobs;
    if(currentTab === 'interview') {
        filtered = jobs.filter(job => job.status === 'interview');
    }
    else if(currentTab === 'rejected') {
        filtered = jobs.filter(job => job.status === 'rejected');
    }

    if(filtered.length === 0) {
        emptyState.classList.remove('hidden');
        emptyState.classList.add('flex');
        return;
    } else {
        emptyState.classList.add('hidden');
        emptyState.classList.add('flex');
    }

    filtered.forEach(job => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all relative group';

        const statusBadge = job.status === 'pending'
            ? `<span class="text-[16px] bg-slate-100 text-slate-500 h-50 p-3 rounded">Not Applied</span>`
            : job.status === 'interview'
            ? `<span class="text-[16px] bg-green-300 text-white-500 font-bold h-50 p-3 rounded">Interviewing</span>`
            : `<span class="text-[16px] bg-red-300 text-white-500 font-bold h-50 p-3 rounded">Rejected</span>`;

        card.innerHTML = `
                    <div class="absolute top-4 right-4">
                        <button onclick="deleteJob(${job.id})"
                            class="text-slate-300 hover:text-rose-500 transition px-2 py-1">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                    
                    <h3 class="text-lg font-bold text-slate-900 mb-1">${job.position}</h3>
                    <p class="text-indigo-600 font-semibold text-sm mb-3">${job.companyName}</p>
                    
                    <div class="flex flex-wrap gap-y-2 gap-x-4 mb-4 text-slate-500 text-sm">
                        <span class="flex items-center gap-1"><i class="fa-solid fa-location-dot"></i> ${job.location}</span>
                        <span class="flex items-center gap-1"><i class="fa-solid fa-business-time"></i> ${job.type}</span>
                        <span class="flex items-center gap-1"><i class="fa-solid fa-money-check-dollar"></i> ${job.salary}</span>
                    </div>
                    
                    ${statusBadge}

                    <p class="text-slate-600 text-sm leading-relaxed m-6">
                        ${job.description}
                    </p>

                    <div class="grid grid-cols-2 gap-3 mt-auto">
                        <button onclick="updateStatus(${job.id}, 'interview')" 
                            class="py-2.5 rounded-xl font-medium text-sm transition-all border ${job.status === 'interview' ? 'bg-indigo-600 text-white border-indigo-600 shadow-indigo-200' : 'bg-white text-indigo-600 border-indigo-100 hover:bg-indigo-50'}">
                            Interview
                        </button>
                        <button onclick="updateStatus(${job.id}, 'rejected')" 
                            class="py-2.5 rounded-xl font-medium text-sm transition-all border ${job.status === 'rejected' ? 'bg-rose-500 text-white border-rose-500 shadow-rose-200' : 'bg-white text-rose-500 border-rose-100 hover:bg-rose-50'}">
                            Rejected
                        </button>
                    </div>
                `;
                container.appendChild(card);
            });
    updateDashboard();
}

window.onload = () => {
    renderJobs();
}