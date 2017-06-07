# Tsawer cropper

Micro service of Tsawer for cropping images.

## Cropping images
To transform an image, you need to make a GET request to http://<server>:8080/images/<transformations>/<image id>.<extension> where:
- transformations: a slash-separated list of transformation operations
- image id: id of the image added to tsawer-uploader
- extension: wanted extension of the image (e.g. jpeg, png, webp)

## Transformations

### crop
Extract a part of the image.
Example: `x_40,y_50,w_300,h_200,c_crop`

| Param | Description | Example |
|-------|-------------|---------|
| h     | Height      | 200     |
| w     | Width       | 300     |
| x     | Left        | 40      |
| y     | Top         | 50      |

### scale
Resize an image.
Example: `w_150,h_100,c_scale`

| Param | Description | Example |
|-------|-------------|---------|
| h     | Height      | 100     |
| w     | Width       | 150     |
