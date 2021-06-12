var bookService  = new BookService();

function loadBookList(bookList) {
    var bookHtml = "";
    if (bookList.length === 0) {
        bookHtml = "No Books Found";
    } else {
        bookList.forEach(function(bookItem, index) {
            var publishedDateObject = new Date(bookItem.publishedDate);
            var publishedDateStr = publishedDateObject.getDate();
            if( publishedDateStr < 10 ) {
                publishedDateStr = "0" + publishedDateStr;
            }
            var publishedMonthStr = publishedDateObject.getMonth() + 1;
            if( publishedMonthStr < 10 ) {
                publishedMonthStr = "0" + publishedMonthStr;
            }
            var publishedFormattedDate = publishedDateStr + "-" + publishedMonthStr + "-" + publishedDateObject.getFullYear();
            
            bookItem.publishedDate = publishedDateObject.getFullYear() + "/" + publishedMonthStr + "/" + publishedDateStr;
            
            var book = JSON.stringify(bookItem);

            bookHtml += "<div class=\"book-item\">" +

                            "<div class=\"item\">" +
                                "<span class=\"title\">ISBN : </span>" +
                                "<span class=\"value1\">" + bookItem.isbn + "</span>" +
                            "</div>" +

                            "<div class=\"item\">" +
                                "<span class=\"title\">Title : </span>" +
                                "<span class=\"value\">" + bookItem.title + "</span>" +
                            "</div>" +   

                            "<div class=\"item\">" +
                                "<span class=\"title\">Author : </span>" +
                                "<span class=\"value\">" + bookItem.author + "</span>" +
                            "</div>" +

                            "<div class=\"item\">" +
                                "<span class=\"title\">Publisher : </span>" +
                                "<span class=\"value\">" + bookItem.publisher + "</span>" +
                            "</div>" +

                            "<div class=\"item\">" +
                                "<span class=\"title\">Published Date : </span>" +
                                "<span class=\"value\">" + publishedFormattedDate + "</span>" +
                            "</div>" +

                            "<div class=\"buttons\">" +
                                "<span id=\"edit\">" +
                                    "<button type=\"button\" onclick='onEdit(" + book + ")'>Edit</button>" +
                                "</span>" +
                                "<span class=\"del\">" +
                                    "<button type=\"button\" onclick=\"remove('" + bookItem.isbn + "')\">Delete</button>" +
                                "</span>" +
                            "</div>" +

                        "</div>"
        });
        document.getElementById("bookListSection").innerHTML = bookHtml;
    }
}

function fetchAndLoadBookList() {
    bookService.getBookList().then(
        function (response) {
            var bookList = JSON.parse(response.responseText);
            loadBookList(bookList.data);
        },
        function(error) {
            alert(error.message);
        }
    );
}

function resetFieldValues() {
    document.getElementById("isbn").value = '';
    document.getElementById("title").value = '';
    document.getElementById("author").value = '';
    document.getElementById("publisher").value = '';
    document.getElementById("publishedDate").value = '';
}

function showAddBookSection() {
    document.getElementById("addBookSection").style.display = 'block';
    document.getElementById("bookListContainer").style.display = 'none';
    resetFieldValues();
}

function showBookListSection() {
    document.getElementById("bookListContainer").style.display = 'block';
    document.getElementById("addBookSection").style.display = 'none';
    document.getElementById("editBookSection").style.display = 'none';    
}

function showEditSection() {
    document.getElementById("bookListContainer").style.display = 'none';
    document.getElementById("editBookSection").style.display = 'block';
}

function onRefresh() {
    fetchAndLoadBookList();
}

function onEdit(book) {
    showEditSection();
    document.getElementById("isbn1").value = book.isbn;
    document.getElementById("title1").value = book.title;
    document.getElementById("author1").value = book.author;
    document.getElementById("publisher1").value = book.publisher;
    document.getElementById("publishedDate1").value = book.publishedDate;
}

function goBack() {
    document.getElementById("bookListContainer").style.display = 'block';
    document.getElementById("addBookSection").style.display = 'none';
    document.getElementById("editBookSection").style.display = 'none';
    fetchAndLoadBookList();
}

function onClickAddBook() {
    bookService.addBook().then(
        function(response) {
            var messageJson = JSON.parse(response.responseText);
            alert(messageJson.message);
            showBookListSection();
            fetchAndLoadBookList();
        },
        function(error) {
            alert(error.message);
        }
    );
}

function onClickUpdate() {
    bookService.updateBook().then(
        function(response) {
            var messageJson = JSON.parse(response.responseText);
            alert(messageJson.message);
            showBookListSection();
            fetchAndLoadBookList();
        },
        function(error) {
            alert(error.message);
        }
    );
}

function remove(isbn) {
    bookService.delete(isbn).then(
        function (response) {
            var messageJson = JSON.parse(response.responseText);
            fetchAndLoadBookList();
            alert(messageJson.message);
        },
        function(error) {
            alert(error.message);
        }
    );
}

bookService.getBookList().then(
    function (response) {
        var bookList = JSON.parse(response.responseText);
        loadBookList(bookList.data);
    },
    function(error) {
        document.getElementById("bookListContainer").innerHTML = error.message;
    }
);
