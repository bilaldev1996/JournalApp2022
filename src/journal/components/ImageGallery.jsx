import { ImageList, ImageListItem } from '@mui/material';
import { useSelector } from 'react-redux';

export const ImageGallery = () => {

    const { imageUrls } = useSelector(state => state.journal.active)
    

    return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
        {imageUrls.map(url => (
            <ImageListItem key={url}>
                <img 
                    src={url} 
                    alt="image"
                    srcSet={`${url} 1x, ${url} 2x`}
                />
            </ImageListItem>
        ))}
    </ImageList>
    );
}