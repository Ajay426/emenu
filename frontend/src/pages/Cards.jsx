import "./Cards.css"

// images
import chaooo from "../images/chaooo.jpg"
import kachori from "../images/kachori.jpg"
import laddooo from "../images/laddooo.jpg"
import momo from "../images/momo.jpg"
import rosogulla from "../images/rosogulla.jpg"
import tea from "../images/tea.jpg"
import { motion } from "framer-motion";


export default function Cards() {

  const foodData = [
    {
      img: chaooo, title: "Chowmine",
      desc: "Start your day right with our fluffy pancakes, served fresh every morning"
    },

    {
      img: kachori, title: "Kachori",
      desc: "Delight in our freshly baked bagels, perfect for any time of day."
    },

    {
      img: laddooo, title: "Laddoo",
      desc: "Celebrate the sweet indulgence of our cinnamon rolls, baked fresh daily"
    },

    {
      img: momo, title: "Momo",
      desc: "Savor our French toast, a breakfast classic made to perfection."
    },

    {
      img: rosogulla, title: "Rosogulla",
      desc: "Indulge in our sweet crepes, a delectable treat for any occasion."
    },

    {
      img: tea, title: "Tea",
      desc: "Enjoy our fluffy omelets, made with farm-fresh eggs and fillings."
    },
  ]

  return (
    <div className="cards-section"
     
    >
      {foodData.map((item, index) => (
        <motion.div className="card" key={index}
          whileHover={{ scale: 1.08, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >

          <div className="card-img">
            <img src={item.img} alt={item.title} />
          </div>

          <div className="card-body">
            <div className="card-header">
              <h3>{item.title}</h3>
              <span>{item.time}</span>
            </div>

            <p>{item.desc}</p>


          </div>

        </motion.div>
      ))}
    </div>
  )
}