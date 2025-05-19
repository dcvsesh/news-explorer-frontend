import autor from "../../../../images/image-03.svg";
function About() {
  return (
    <div className="about">
      <img
            src={autor}
            alt="Imagen del autor"
            className="about__image"
          />
      <div className="about__author">
      <h2 className="about__author_name">Acerca del autor</h2>
      <p className="about__author_description">
        Hola, soy Susana Sánchez, diseñadora y desarrolladora web con formación en
        Diseño y Comunicación Visual. Me especializo en crear experiencias
        digitales intuitivas y visualmente atractivas, aplicando tecnologías
        como HTML, CSS, JavaScript, React y Node.js. 
      </p>
      <br></br>
      <p className="about__author_description">
        Durante mi formación en Practicum, desarrollé proyectos reales que me permitieron fortalecer mis
        habilidades en desarrollo full-stack, diseño responsivo y buenas
        prácticas de código. 
      </p>
      </div>
    </div>
  );
}

export default About;
