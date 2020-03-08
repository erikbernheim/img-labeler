# img-labeler

#Live Demo Here https://erikbernheim.github.io/img-labeler/

Doc is coming!

# Overall workflow with comma and the img-labeler

## comma and github part
Fork https://github.com/commaai/comma10k
Create a branch from your github master. You will later on upload your finished masks into the masks directory of your branch.

## img-labeler page
Step 0: Goto to commai img directory to get the address of the image you want to label: https://github.com/commaai/comma10k/tree/master/imgs
click on the link of the imag to get the image displayed.
Right-click on the image to copy its address.
Step 1: paste the address of the image to the Image Url box. Note that the address of the image is with raw=true
The image is displayed on automatically once you pasted the address.
Step 2: start with the "road" label, by clicking on the "Road" button. Then mark the contour of all the roads of the image. I usually start by dropping a point outside the picture so that at the end the picture is completely covered (not missing some point on the border of the image).
Note also that each object is a layer.
Step 3: Then do the lane marking by clicking on the corresponding button (bright red!)
Step 4: Do the "movable" (bright green): cars (even the other side of the road and parked cars), people, animal, bikes...
Step 5: Do the "my-car" pink. Start by dropping a point outside of the image, again to avoid unmarked points.

Do not worry about other unmarked area e.g. sky, road separations, trees... The tool will automatically mark them as "undrivable"
The tool will also crop automatically the area outside the picture when you save your work to your desktop (download directory).

## Upload your labeled images to github and make a Pull Request
Step 1: goto your branch in github, you created in first first step.
Step 2: got to the masks directory
Step 3: Upload your files to your masks directory (button top right)
Step 4: you'll put a title like 'masks for XXX-YYY', then click commit
Step 5: Create a Pull Request (this will ask comma guys to check your images etc...). Name it and click Pull Request.
Then your done with this branch, only upload updates to your already submitted images, when requested for modifications, correction, completion by comma's guys.
When you want to label more images, create a new branch from your master! Otherwise, you'll get conflicts or other github errors stuff.
