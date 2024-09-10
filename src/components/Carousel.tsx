import "../styles/app.scss";

// const images = [
//     "https://i.etsystatic.com/6381797/r/il/b72e00/4478505056/il_680x540.4478505056_a3f8.jpg",
//     "https://i.etsystatic.com/6381797/r/il/81cbc2/3314963168/il_680x540.3314963168_mwzs.jpg",
//     "https://i.etsystatic.com/6381797/r/il/228324/5687718088/il_680x540.5687718088_shqv.jpg",
//     "https://i.etsystatic.com/6381797/r/il/8ac1a7/4454670832/il_680x540.4454670832_ffb0.jpg",
//     "https://i.etsystatic.com/3697248676/r/il/459c67/3697248676/il_170x135.3697248676_qaj2.jpg",
//     "https://i.etsystatic.com/4365766966/r/il/55db78/4365766966/il_170x135.4365766966_9ld0.jpg",
//   ];

function getImages(num: number){
  let images = [];
  let url = "https://picsum.photos/800/1200?random=";
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

    console.log(car);
  
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
