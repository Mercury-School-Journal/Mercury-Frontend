$(document).ready(function () {
    let currentDayIndex = 0;
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

    function showDay(index) {
        $('.day-container').removeClass('active');
        $('#' + days[index]).addClass('active');
    }

    $('#prevDay').click(function () {
        currentDayIndex = (currentDayIndex === 0) ? days.length - 1 : currentDayIndex - 1;
        showDay(currentDayIndex);
    });

    $('#nextDay').click(function () {
        currentDayIndex = (currentDayIndex === days.length - 1) ? 0 : currentDayIndex + 1;
        showDay(currentDayIndex);
    });
    const request = indexedDB.open("GradesDB", 3);

    request.onsuccess = (event) => {
        db = event.target.result;

        // Pobierz przedmioty
        const subjectsTransaction = db.transaction(["subjects"], "readonly");
        const subjectsStore = subjectsTransaction.objectStore("subjects");
        const subjectsRequest = subjectsStore.getAll();

        subjectsRequest.onsuccess = (event) => {
            const subjects = event.target.result;

            // Dla każdego przedmiotu, pobierz oceny
            subjects.forEach(subject => {
                const gradesTransaction = db.transaction(["grades"], "readonly");
                const gradesStore = gradesTransaction.objectStore("grades");
                const gradesRequest = gradesStore.getAll();

                gradesRequest.onsuccess = (event) => {
                    const grades = event.target.result;
                    // Filtruj oceny dla danego przedmiotu
                    const subjectGrades = grades.filter(grade => grade.subject_id === subject.id);
                    if (sessionStorage.getItem("newIds") != '[]') {
                    // Stwórz elementy HTML
                    const subjectDiv = $('<div class="rating-subject"></div>');
                    const subjectNameDiv = $('<div class="rating-subject-name"></div>').text(subject.name);
                    const ratingsDiv = $('<div class="ratings"></div>');

                    subjectGrades.forEach(grade => {
                        const gradeDiv = $('<div class="rating-square"></div>').text(grade.grade);
                        ratingsDiv.append(gradeDiv);
                    });

                    subjectDiv.append(subjectNameDiv).append(ratingsDiv);
                    $('.rating-container').append(subjectDiv); // Zmień 'your-container-id' na ID kontenera, w którym chcesz dodać elementy
                }
                else{
                    $('.rating-container').append('<p class="no-grades">Brak nowych ocen</p>');
                }
                };
            });
        };
    };
    

    request.onerror = (event) => {
        console.error("Database error: " + event.target.errorCode);
    };
});