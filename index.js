function myFunction() {
  var x = document.getElementById("myText").value;
  document.getElementById("demo").innerHTML = x.split("");
  const waterLevels1 = x.split("");

  let empty = [];
  let valid = waterLevels1.map(function (n) {
    if (isNaN(n)) {
      empty.push("1");
    }
  });
  console.log(empty);
  if (empty.length > 0) {
    alert("Enter Only Number");
  } else {
    myFunction1();
  }

  function myFunction1() {
    const waterLevels = calculateWaterLevels(x.split(""));
    console.log(waterLevels, "1");
    let maxEle = Math.max(...x.split("")) + 1;
    console.log(maxEle, "3");
    let waterContent = waterLevels.reduce((a, b) => a + b, 0);

    console.log(waterContent, "2");
    document.getElementById("demoOutput").innerHTML = waterContent;
    const svg = createSVG(x.split(""), waterLevels);
    const svgOut = createSVGOut(x.split(""), waterLevels);

    // Function to calculate water levels
    function calculateWaterLevels(arr) {
      let left = new Array(arr.length).fill(0);
      let right = new Array(arr.length).fill(0);
      let waterLevels = new Array(arr.length).fill(0);

      // Find the highest block on the left of each block
      let max = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
          max = arr[i];
        }
        left[i] = max;
      }

      // Find the highest block on the right of each block
      max = 0;
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] > max) {
          max = arr[i];
        }
        right[i] = max;
      }

      for (let i = 0; i < arr.length; i++) {
        waterLevels[i] = Math.min(left[i], right[i]) - arr[i];
      }

      return waterLevels;
    }

    // Function to create an SVG visualization of the water tank
    function createSVG(arr, waterLevels) {
      let svgInput = document.getElementById("svgInput");
      let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100vh");
      // svg.setAttribute("style", "border:1px solid red");
      svgInput.appendChild(svg);

      // Create rect elements for each block
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < maxEle; j++) {
          let wBlock = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect"
          );
          wBlock.setAttribute("x", i * 50);
          wBlock.setAttribute("y", j * 25);
          wBlock.setAttribute("width", 50);
          wBlock.setAttribute("height", 25);
          wBlock.setAttribute("fill", "white");
          wBlock.setAttribute("stroke", "black");
          wBlock.setAttribute("stroke-width", "1");
          svg.appendChild(wBlock);
        }
      }

      // Create rect elements for each block
      for (let i = 0; i < arr.length; i++) {
        let block = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        block.setAttribute("x", i * 50);
        block.setAttribute("y", maxEle * 25 - 25 * arr[i]);
        block.setAttribute("width", 50);
        block.setAttribute("height", 25 * arr[i]);
        block.setAttribute("fill", "yellow");
        block.setAttribute("stroke", "black");
        block.setAttribute("stroke-width", "1");
        svg.appendChild(block);
      }

      // Create path elements for each unit of water
      for (let i = 0; i < arr.length; i++) {
        if (waterLevels[i] > 0) {
          let water = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          water.setAttribute(
            "d",
            `M ${i * 50} ${maxEle * 25 - 25 * waterLevels[i]} h 50 v ${
              25 * waterLevels[i]
            } h -50 Z`
          );
          water.setAttribute("fill", "#87CEEB");
          water.setAttribute("stroke", "black");
          water.setAttribute("stroke-width", "1");
          svg.appendChild(water);
        }
      }
      return svg;
    }

    function createSVGOut(arr, waterLevels) {
      let svgOutput = document.getElementById("svgOutput");
      let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100vh");

      // svg.setAttribute("style", "border:1px solid red");
      svgOutput.appendChild(svg);

      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < maxEle; j++) {
          let wBlock = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect"
          );
          wBlock.setAttribute("x", i * 50);
          wBlock.setAttribute("y", j * 25);
          wBlock.setAttribute("width", 50);
          wBlock.setAttribute("height", 25);
          wBlock.setAttribute("fill", "white");
          wBlock.setAttribute("stroke", "black");
          wBlock.setAttribute("stroke-width", "1");
          svg.appendChild(wBlock);
        }
      }

      for (let i = 0; i < arr.length; i++) {
        if (waterLevels[i] > 0) {
          let water = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          water.setAttribute(
            "d",
            `M ${i * 50} ${maxEle * 25 - 25 * waterLevels[i]} h 50 v ${
              25 * waterLevels[i]
            } h -50 Z`
          );
          water.setAttribute("fill", "#87CEEB");
          water.setAttribute("stroke", "black");
          water.setAttribute("stroke-width", "1");
          svg.appendChild(water);
        }
      }

      return svg;
    }
  }
}
