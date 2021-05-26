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

                            "<div class=\"del\">" +
                                "<button type=\"button\" onclick=\"remove('" + bookItem.isbn + "')\">Delete</button>" +
                            "</div>" +

                        "</div>"
        });
    }
    document.getElementById("bookListSection").innerHTML = bookHtml;
    document.getElementById("isbn").value = '';
    document.getElementById("title").value = '';
    document.getElementById("author").value = '';
    document.getElementById("publisher").value = '';
    document.getElementById("publishedDate").value = '';

}

function onRefresh() {
    fetchAndLoadBookList();
}

function goBack() {
    document.getElementById("bookListContainer").style.display = 'block';
    document.getElementById("addBookSection").style.display = 'none';
    fetchAndLoadBookList();
}

function onClickAddBook() {
    bookService.addBook().then(
        function(response) {
            var messageJson = JSON.parse(response.responseText);
            alert(messageJson.message);
            fetchAndLoadBookList();
            showBookListSection();
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

function showAddBookSection() {
    document.getElementById("addBookSection").style.display = 'block';
    document.getElementById("bookListContainer").style.display = 'none';
}

function showBookListSection() {
    document.getElementById("bookListContainer").style.display = 'block';
    document.getElementById("addBookSection").style.display = 'none';
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
