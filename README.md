# WP Gulp Kit
Optimize routine processes of WordPress development using Gulp (and Bower).

## What can WP Gulp Kit
1. Autoreload with BrowserSync.
2. Bower: automoving Bower components files to Vendors Styles and Vendors JS folders.
3. CSS: sass to css converter, error tracking, autoprefix, sourcemaps, minification and `@media` merging.
4. JS: concatenation and minification Vendor and Custom JS.
5. Images: minification PNG, JPEG, GIF and SVG.
6. Watching for changes to CSS, JS, PHP, Bower components and autolaunching tasks.
7. Line ending correction.
8. Print tasks notifications.

## Getting Started

### Step 1. Download Files
Clone the repository or download all files of this repository inside the root folder of your WordPress theme.

### Step 2. Configure Project
Configure the project variables in the `gulpfile.js` (settings start from `#31` string).

> Check `projectURL`, others variables can be unchanged

### Step 3. Check Stuff
It needs to have Node.js, NPM, Gulp and Bower installed globally.

- Download [Node.js](https://nodejs.org/en/download/) and install. Install it only once! Check before and after installation.

```bash
node -v
# The command print Node.js version (for example: v7.0.0)

npm -v
# The command print NPM version (for example: v3.10.9)

# If you see versions, it means that packages was installed.
```

- Install Gulp globally. To do that, use the terminal command.

```bash
# MAC OS
sudo npm install --global gulp

# Linux
npm install --global gulp

# Check installation
gulp -v
```

- Install Bower globally with NPM. Run the following command.

```bash
# MAC OS
sudo npm install --global bower

# Linux
npm install --global bower

# Check installation
bower -v
```

### Step 4. Install Node.js Dependencies
Go to root folder of your WordPress theme in the terminal and use the command. Wait for it download all Node.js dependencies. It's one time process and can take about 5 minutes to add a `node_modules` folder inside your project.

```bash
# MAC OS
sudo npm install

# Linux
npm install
```

### Step 5. Install Bower Dependencies and Configure
Go to root theme's folder in the terminal and use the command.

```bash
#installs the project dependencies listed in bower.json
bower install
```


### Step 6. Run Gulp
Let's start Gulp magic!

```bash
# To start gulp
gulp

# To stop gulp press CTRL (⌃) + C
```

> **Enjoy WordPress development now!**

> Create and change `.php`, `.scss` and `.js` files, add Bower dependencies. All files will be automatically added to the project and change view in the browser.


## Additional Information

### Images
Gulp optimizes and moves images from `assets/img/raw` to `assets/img`, but it happens once after launching Gulp default task. To optimize images anytime run following command.

```bash
# To optimize images
gulp images
```

### Bower
Bower packages are installed to `assets/bower`, don't remove, rename or replace the folder.
Gulp detects main files of Bower packages and places them to `assets/css/vendors` and `assets/js/vendors` folders. Some packages have not define main file in there `bower.json`, but they sure have one. To resolve the problem make an override in project's main `bower.json`.

```json
  /* bower.json main file */
  "overrides": {
    "package_name": {
      "main": "path/to/main_file"
    }
  }
```

### Scripts
Gulp concatenate and minificate `.js` files automatically in alphabetical order. To reorder files, define `jsVendorOrder` (for `assets/js/vendors` files) and `jsCustomOrder` (for `assets/js/custom` files) in `gulpfile.js` and restart Gulp.


### Styles
To add `.css` and `.scss` the files to project, structure main `style.scss` file with the `@import` rule.

```scss
@import "vendors/normalize";
@import "vendors/sanitize";
```

Don't forget about right sequence.
