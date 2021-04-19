const GENERIC_ERROR_MESSAGE = "Something Went Wrong. Try Again Later.";

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

function getBookList(callback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            callback(this);
        }
    };
    xhttp.open("GET", "/books", true);
    xhttp.send();
}

//After Refresh button
function onRefresh() {
    getBookList(function(response) {
        if(response.status === 200) {
            var bookList = JSON.parse(response.responseText);
            loadBookList(bookList);
        } else {
            alert(GENERIC_ERROR_MESSAGE);
        }
    });
}

// After add book
function addBook() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if(this.status === 200){
                alert(this.responseText);
            } else {
                alert(GENERIC_ERROR_MESSAGE);
            }
        }
    };
    xhttp.open("POST", "/books", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("isbn=" + document.getElementById("isbn").value +
                "&title=" + document.getElementById("title").value +
                "&author=" + document.getElementById("author").value +
                "&publisheddate=" + document.getElementById("publisheddate").value +
                "&publisher=" + document.getElementById("publisher").value)
}

getBookList(function(response) {
    if(response.status === 200) {
        var bookList = JSON.parse(response.responseText);
        loadBookList(bookList);
    } else {
        document.getElementById("bookListContainer").innerHTML = 
            GENERIC_ERROR_MESSAGE;
    }
});
