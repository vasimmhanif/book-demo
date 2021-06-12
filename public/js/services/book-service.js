const GENERIC_ERROR_MESSAGE = "Something Went Wrong. Try Again Later.";

function BookService() {}

BookService.prototype.getBookList = function() {
    return new Promise(function(resolve, reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if(this.status == 200) {
                    resolve(this);
                } else {
                    reject({message: GENERIC_ERROR_MESSAGE});
                }
            }
        };
        xhttp.open("GET", "/books", true);
        xhttp.send();
    });
};

BookService.prototype.addBook = function() {
    return new Promise(function(resolve,reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if(this.status === 200){
                    resolve(this);
                } else {
                    reject({message: GENERIC_ERROR_MESSAGE});
                }
            }
        };
        xhttp.open("POST", "/books", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("isbn=" + document.getElementById("isbn").value +
                    "&title=" + document.getElementById("title").value +
                    "&author=" + document.getElementById("author").value +
                    "&publisher=" + document.getElementById("publisher").value +
                    "&publishedDate=" + document.getElementById("publishedDate").value);
    });
};

BookService.prototype.delete = function(isbnValue) {
    return new Promise(function(resolve, reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if(this.status == 200) {
                    resolve(this);
                } else {
                    reject({message: GENERIC_ERROR_MESSAGE});
                }
            }
        };
        xhttp.open("DELETE", "/books/" + isbnValue);
        xhttp.setRequestHeader('contentType','application/json');
        xhttp.send();
    });
};

BookService.prototype.updateBook = function() {
    return new Promise(function(resolve,reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if(this.status === 200){
                    resolve(this);
                } else {
                    reject({message: GENERIC_ERROR_MESSAGE});
                }
            }
        };
        xhttp.open("PUT", "/books", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("isbn=" + document.getElementById("isbn1").value +
                    "&title=" + document.getElementById("title1").value +
                    "&author=" + document.getElementById("author1").value +
                    "&publisher=" + document.getElementById("publisher1").value +
                    "&publishedDate=" + document.getElementById("publishedDate1").value);
    });
};
