import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function NestedGrid() {
  return (
    <div style={{ width: '100%' }}>
      <Carousel infiniteLoop showThumbs={false} showStatus={false}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </Carousel>
    </div>
  );
}
