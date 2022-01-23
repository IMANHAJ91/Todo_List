// book class
class book {
    constructor(title,author,ispn){
        this.title=title;
        this.author=author;
        this.ispn=ispn;
    }
}

// ui class
class UI {
    static displayBooks(){
        const myBooks=store.getBooks();
        const books=myBooks;
        books.forEach((book)=>{UI.addBook(book)})
    }
     static addBook(book){
        var List=document.querySelector("#table-book-list");
        var row =document.createElement("tr");
        row.innerHTML=`
        <td> ${book.title}</td>
        <td>${book.author}</td>
        <td>${book.ispn}</td>
        <td><a href="#" class="delet"> x </a></td>
        
        `;
        List.appendChild(row);
       
    }
    static clearFeilds(){
        document.querySelector("#title").value="";
        document.querySelector("#author").value="";
        document.querySelector("#isbn").value="";
    }
    static deletElement(ele){
     if(ele.classList.contains("delet"))
     { ele.parentElement.parentElement.remove();}

    }
    static showMessage(message ,className){
        const myDiv=document.createElement("div");
        document.querySelector(".my-book-list11").insertBefore(myDiv,document.querySelector(".form-group"));
        myDiv.textContent=message;
        myDiv.className=className;
        setTimeout(() => {
      myDiv.remove()   ;
        }, 3000);

    }
}
class store {
    static getBooks(){
        if(localStorage.getItem("books")==null)
        {
            return [];
        }
        else 
        {
            return JSON.parse(localStorage.getItem("books"))
        }
    }
    static addBook(book){
        var books=store.getBooks();
        books.push(book);
        localStorage.setItem("books",JSON.stringify(books));
    }
    static deletBook(my_id){
       const Bookss=store.getBooks();
      
        Bookss.forEach((book,index)=>{
            if(book.ispn===my_id)
            {
               Bookss.splice(index,1);
              
            }
        });
 
localStorage.setItem("books",JSON.stringify(Bookss));
    }
}

document.addEventListener("DOMContentLoaded",UI.displayBooks);
document.querySelector("#book-list").addEventListener("submit",(e)=>{
e.preventDefault();
const title=document.querySelector("#title").value;
const author=document.querySelector("#author").value;
const isbn=document.querySelector("#isbn").value;

if(title==="" || author==="" || isbn==="")
{
    UI.showMessage("Please enter all values","danger");
}
else{
const myBook =new book(title,author,isbn);
UI.addBook(myBook);
store.addBook(myBook);
UI.clearFeilds();
UI.showMessage("Added successfuly","success");
}

})
document.querySelector("#table-book-list").addEventListener("click",function(e){
    UI.deletElement(e.target);
    store.deletBook(e.target.parentElement.previousElementSibling.textContent);
    UI.showMessage("Book removed ","success");
})