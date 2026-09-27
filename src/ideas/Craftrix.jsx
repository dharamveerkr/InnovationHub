import ProjectCard from '../components/ProjectCard';

export default function Craftrix() {
  return (
    <ProjectCard
      id="008"
      name="Craftrix"
      highlight="Apparel"
      description="A premium e-commerce platform for high-quality garments. Features a seamless shopping experience, dynamic product galleries, cart management, and a luxury brand aesthetic built for modern fashion."
      tags={['E-commerce', 'Fashion', 'React']}
      starred={true}
      href="/prototypes/craftrix"
    />
  );
}
