var bookService  = new BookService();

function loadBookList(bookList) {
    var bookHtml = "";
    if (bookList.length === 0) {
        bookHtml = "No Books Found";
    } else {
        bookList.forEach(function(bookItem, index) {
            bookHtml += `<div class="book-item">   
                            <div class="item">
                                <span class="title">ISBN : </span>
                                <span class="value">${bookItem.isbn}</span>
                            </div>

                            <div class="item">
                                <span class="title">Title : </span>
                                <span class="value">${bookItem.title}</span>
                            </div>    
                            
                            <div class="item">
                                <span class="title">Author : </span>
                                <span class="value">${bookItem.author}</span>
                            </div>
                            
                            <div class="item">
                                <span class="title">Published Date : </span>
                                <span class="value">${bookItem.publisheddate}</span>
                            </div>

                            <div class="item">
                                <span class="title">Publisher : </span>
                                <span class="value">${bookItem.publisher}</span>
                            </div>
                        </div>`;
        });
    }
    document.getElementById("bookListContainer").innerHTML = bookHtml; 
}

function onRefresh() {
    bookService.getBookList().then(
        function (value) {
            var bookList = JSON.parse(value.responseText);
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
    function (value) {
        var bookList = JSON.parse(value.responseText);
        loadBookList(bookList);
    },
    function(error) {
        document.getElementById("bookListContainer").innerHTML = error.message;
    }
);
