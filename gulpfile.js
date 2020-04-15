/**
 @license
 Copyright (c) 2020 BidMyDeal.ca Authors. All rights reserved.
 */

const gulp = require('gulp');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const del = require('del');

const renameFileObjs = {
  "button-shared-styles.js" : "styles-shared-button.js",
  "my-app.js" : "app-page.js",
  "my-icons.js" : "app-icons.js",
  "my-view1.js" : "app-page-view1.js",
  "my-view2.js" : "app-page-view2.js",
  "my-view3.js" : "app-page-view3.js",
  "my-view404.js" : "app-page-view404.js",
  "shared-styles.js" : "styles-shared.js"
};

const regexFiles = Object.keys(renameFileObjs);
regexFiles.forEach(function(taskName)
{
  gulp.task("regex:" + taskName, async function()
  {
    let filenameOld = taskName;
    let filenameNew = renameFileObjs[taskName];
    let componentOld = filenameOld.replace(".js", "");
    let componentNew = filenameNew.replace(".js", "");
    let constructorOld = normalizeHeader(componentOld);
    let constructorNew = normalizeHeader(componentNew);

    await new Promise((resolve) =>
         gulp.src(["src/components/*"], { base: '.' })
         .pipe(replace(new RegExp(componentOld, 'g'), componentNew))
         .pipe(replace(new RegExp(constructorOld, 'g'), constructorNew))
         .pipe(gulp.dest('.'))
         .on('end', resolve));
  });
});

gulp.task('ownerless:regex', gulp.series(
     "regex:button-shared-styles.js",
     "regex:my-app.js",
     "regex:my-icons.js",
     "regex:my-view1.js",
     "regex:my-view2.js",
     "regex:my-view3.js",
     "regex:my-view404.js",
     "regex:shared-styles.js"
));

const renameFiles = Object.keys(renameFileObjs);
const { spawn } = require('child_process');
renameFiles.forEach(function(taskName)
{
  gulp.task("git-mv:" + taskName, async function()
  {
    let filenameNew = renameFileObjs[taskName];
    let folderName = './src/components/';
    let filenameOld = folderName + taskName;

    /*
    * SEE:  https://www.npmjs.com/package/gulp-exec
    * COMMAND:  git mv old_filename new_filename
    */
    const gitMv = spawn("git", ["mv", filenameOld, folderName + filenameNew]);
    /*
    gitMv.stdout.on('data', (data) => { console.log(`stdout: ${data}`); });
    gitMv.stderr.on('data', (data) => { console.error(`stderr: ${data}`); });
    gitMv.on('close', (code) => { console.log(`child process exited with code ${code}`); });
    */
    await gitMv.on('close',
         (code) =>
         {
           console.log(`child process exited with code ${code}`);
           console.log("\tRENAMING:  ", taskName, " TO NEW NAME:  ", filenameNew);
         });
  });
});

gulp.task('ownerless:git-mv', gulp.parallel(
     "git-mv:button-shared-styles.js",
     "git-mv:my-app.js",
     "git-mv:my-icons.js",
     "git-mv:my-view1.js",
     "git-mv:my-view2.js",
     "git-mv:my-view3.js",
     "git-mv:my-view404.js",
     "git-mv:shared-styles.js"
));

const regexObjs = {
  "index.html" : [{"my-app" : "app-page"}, {"My App" : "PWA Ownerless Kit"}],
  "manifest.json" : [{"My App" : "PWA Ownerless Kit"}],
  "polymer.json" : [{"my-app" : "app-page"}],
  "push-manifest.json" : [{"my-app" : "app-page"}, {"my-view" : "app-page-view"}],
  'src/actions/*' : [{"my-view" : "app-page-view"}]
};

const regexTasks = Object.keys(regexObjs);
regexTasks.forEach(function(taskName) {
  gulp.task(taskName, async function() {
    let tasks = regexObjs[taskName];
    console.log("PROCESSING:  ", taskName);
    for(let index in tasks)
    {
      let subtasks = tasks[index];
      for(let pattern in subtasks)
      {
        let replacement = subtasks[pattern];
        if(pattern.match(" ").length > 0)
        {
          pattern = new RegExp(pattern, 'gi');
        }
        else{ pattern = new RegExp(pattern, 'g'); }
        console.log("\tpattern:  " + pattern, ", replacement:  ", replacement);
        await new Promise((resolve) =>
             gulp.src([taskName], { base: '.' })
             .pipe(replace(pattern, replacement))
             .pipe(gulp.dest('.' ))
             .on('end', resolve));
      }
    }
  });
});

gulp.task('ownerless:replace', gulp.series(
     'index.html',
     'manifest.json',
     'polymer.json',
     'push-manifest.json',
     'src/actions/*'
));

gulp.task('ownerless:init', gulp.series(
     "ownerless:replace",
     "ownerless:regex",
     "ownerless:git-mv"
));

function normalizeHeader(header) {
  let key = "";
  let upperCase = false;
  for (let i = 0; i < header.length; ++i)
  {
    let letter = header[i];
    if ((letter === " " || letter === "-") && key.length > 0) {
      upperCase = true;
      continue;
    }
    if (!isAlnum(letter)){ continue; }
    if (key.length === 0 && isDigit(letter)) {
      continue; // first character must be a letter
    }
    if (key.length === 0 || upperCase) {
      upperCase = false;
      key += letter.toUpperCase();
    }
    else { key += letter.toLowerCase(); }
  }
  return key;
}

// Returns true if the character char is alphabetical, false otherwise.
function isAlnum(char) {
  return char >= 'A' && char <= 'Z' ||
       char >= 'a' && char <= 'z' ||
       isDigit(char);
}

// Returns true if the character char is a digit, false otherwise.
function isDigit(char) {
  return char >= '0' && char <= '9';
}

/**
 * Allows the build to work with Firebase functions, by building the
 * Firebase-ready version of the PWA, moving the necessary
 * files to the functions folder for use by PRPL Server.
 * SEE:  https://gist.github.com/Anid4u2c/67d3374595d8a68f4d8bcf6d167dea4e
 */
gulp.task('firebase', () => {
    // These are the files needed by PRPL Server, that are going to be moved to the functions folder
    const filesToMove = [ 'build/polymer.json', 'build/**/index.html', 'build/**/push-manifest.json' ];
    // Delete the build folder inside the functions folder
    return del('functions/build')
        .then(() =>
            // Copy the files needed by PRPL Server
            new Promise((resolve) =>
                gulp
                    .src(filesToMove, { base: '.' })
                    .pipe(gulp.dest('functions'))
                    .on('end', resolve)))
        // Delete them from the original build
        .then(() => del(filesToMove));
});

/**
 * Cleans the prpl-server build in the server directory.
 */
gulp.task('prpl-server:clean', () => {
  return del('server/build');
});

/**
 * Copies the prpl-server build to the server directory while renaming the
 * node_modules directory so services like App Engine will upload it.
 */
gulp.task('prpl-server:build', () => {
  const pattern = 'node_modules';
  const replacement = 'node_assets';

  return gulp.src('build/**')
    .pipe(rename(((path) => {
      path.basename = path.basename.replace(pattern, replacement);
      path.dirname = path.dirname.replace(pattern, replacement);
    })))
    .pipe(replace(pattern, replacement))
    .pipe(gulp.dest('server/build'));
});

gulp.task('prpl-server', gulp.series(
  'prpl-server:clean',
  'prpl-server:build'
));
