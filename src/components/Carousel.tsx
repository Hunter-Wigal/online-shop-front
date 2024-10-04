import "../styles/app.scss";


// Fix to generate images when adding products or something cleaner
export function getImages(num: number){
  let images = [];
  let url = "https://picsum.photos/1200/800?random=";
  for(let i=0; i<num; i++){
    images.push(url + i);
  }

  return images;
}

const images = getImages(5);

export default function Carousel() {


  function next_image() {
    let car = document.getElementById("carousel");
    let img = document.getElementsByClassName("car-image")[0];
  
    if(!car || !img)
    return;
    
    let imgWidth = img.clientWidth
  
    car.scrollLeft += imgWidth;
    
  }
  
  function prev_image(){
    let car = document.getElementById("carousel");
    let img = document.getElementsByClassName("car-image")[0];
  
    if(!car || !img)
    return;
  
    let imgWidth = img.clientWidth
  
    car.scrollLeft -= imgWidth;
  }
  return (
    <>
      <div className="car-container">
          <div className="carousel" id="carousel">
            {images.map((link) => {
              return <img className="car-image" key={link} src={link} />;
            })}
          </div>
          <button onClick={prev_image} className={"prev_btn scroll_btn"}>&#8249;</button>
          <button onClick={next_image} className={"next_btn scroll_btn"}>&#8250;</button>
      </div>
    </>
  );
}
