import chat from "../assets/img/icon-chat.png";
import money from "../assets/img/icon-money.png";
import security from "../assets/img/icon-security.png";
import featureData from "../data/featureData"; 

  const featureIcons = {
    Chat: chat,
    Money: money,
    Security: security,
  };

function Features(){
    return(
       
         <section className="features">
        <h2 className="sr-only">Features</h2>

        {featureData.map((feature) => (
          <div className="feature-item" key={feature.id}>
            <img
              src={featureIcons[feature.type]}
              alt={`${feature.type} Icon`}
              className="feature-icon"
            />
            <h3 className="feature-item-title">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>
     
    )
}

export default Features;