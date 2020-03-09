# img-labeler

### Live Demo Here https://erikbernheim.github.io/img-labeler/


## img-labeler recommended workflow
Step 0: Visit the comma10k img directory and copy the direct image address of the image you want to label: https://github.com/commaai/comma10k/tree/master/img
Right-click on the image to copy its address.

Step 1: Launch the img-labeler app from the URL above, and paste the URL into the Image URL box.

Step 2: Start by changing your color to the “moveable” color, (either by clicking movable, or m on your keyboard), then zoom in (with scroll), and place masks by clicking tightly around all movable objects (cars, motorcycles, bicycles, etc…)
*NOTE: The tool automatically crops your image when you save, drawing outside the lines is encouraged, to prevent any blank space on the borders, layers should also overlap as you work. Many users also like to lower the mask opacity as they work.*

Step 3: Now label lane markings using the same process as above.

Step 4: Label the road, and by using the layers palette, send the road layer to the bottom.

Step 5: Label "my-car" in pink. Start by dropping a point outside of the image, to avoid unmarked points.

Step 6: Undriveable is optional, img-labeler will automatically add undriveable to any areas left blank when you save.

Step 7: Save your image


### Upload your labeled images to GitHub  and make a Pull Request
Step 1: Fork comma10k https://github.com/commaai/comma10k/

Step 2: Go to the mask directory.

Step 3: Replace the existing masks in your range, with the masks you updated.

Step 4: Create a pull request between your branch and comma10k master.

Step 5: Create a Pull Request (this will ask comma guys to check your images etc...). Name it and click Pull Request.

Report any issues in GitHub issues for this repo or in Discord.

Any git questions can usually be answered on StackOverflow.
