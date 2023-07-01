export default function ImgDisplay({ gifImage }: { gifImage: string }){
    return (
        <div className="card bg-base-300 place-items-center justify-center overflow-hidden ">
          <img
            src={gifImage}
            alt="GIF"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
    )
}
