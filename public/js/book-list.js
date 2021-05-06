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

                        "</div>"
        });
    }
    document.getElementById("bookListContainer").innerHTML = bookHtml; 
}

function onRefresh() {
    bookService.getBookList().then(
        function (response) {
            var bookList = JSON.parse(response.responseText);
            loadBookList(bookList);
        },
        function(error) {
            alert(error.message);
        }
    );
}

function onClickAddBook() {
    bookService.addBook().then(
        function(response) {
            alert(response.responseText);
        },
        function(error) {
            alert(error.message);
        }
    );
}

bookService.getBookList().then(
    function (response) {
        var bookList = JSON.parse(response.responseText);
        loadBookList(bookList);
    },
    function(error) {
        document.getElementById("bookListContainer").innerHTML = error.message;
    }
);
