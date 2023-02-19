function main() {
    const url = new URL(window.location.href);
    const addCart = url.searchParams.get("addCart");
  
    fetchData(addCart);
  
  }







  main();