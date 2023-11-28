const pagination_heading = (start:any, end:any, total:any) => {
    if(!(start>=0 && end>=0 && total>=0))
        return;
    let data_count:any = document.querySelector(".pagination p");
    if(total===0)
        data_count.innerHTML = `0 Records`;
    else
        data_count.innerHTML = `${start}-${end} of ${total}`;
    let prev_page:any=null;
    let next_page:any=null;
    prev_page.disabled = (prev_page.name === '0') ? true : false;
    next_page.disabled = (end >= total) ? true : false;
}