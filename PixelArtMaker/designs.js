$(document).ready(function() {
  /*-------------------------------------
      Variables
  --------------------------------------*/
  const pixelCanvas = $("#pixel_canvas");
  let height = $("#input_height");
  let width = $("#input_width");
  let colorPicker = $("#colorPicker");
  let gridLines = true;

  /*-------------------------------------
      Functions
  --------------------------------------*/
  function makeGrid() {
    //Clear Grid
    pixelCanvas.children().remove();
    
    //Iterate over the input height and width value to create table
    for (let i = 0; i < height.val(); i++) {
      pixelCanvas.append("<tr></tr>");
      for (let j = 0; j < width.val(); j++) {
        pixelCanvas.children().last().append("<td></td>");
      }
    }

    printGrid();
  }

  function printGrid() {
    //Event handler - Fill the grid with the colour selected
    pixelCanvas.on("click", "td", function() {
      $(this).css("background-color", colorPicker.val());
    });

    //Event handler - Remove colour in the cell on double click
    pixelCanvas.on("dblclick", "td", function() {
      $(this).css("background-color", "");
    });

    // Ability to press down mouse and draw on multiple cells
    let mouseDown = false;

    pixelCanvas.mousedown(function(evt) {
      evt.preventDefault();
      mouseDown = true;
    });

    $("body").mouseup(function() {
      mouseDown = false;
    });

    pixelCanvas.on("mousemove", "td", function() {
      if (mouseDown) {
        $(this).css("background-color", colorPicker.val());
      }
    });
  }

  /*-------------------------------------
      Events
  --------------------------------------*/
  //Event Handler (submit) - Call function on submit
  $("#sizePicker").submit(function(evt) {
    //Prevent Refresh after submit
    evt.preventDefault();
    makeGrid();
  });

  //Click Event - Add new row on top
  $("#addRowTop").click(function() {
    const currentWidth = $("tr:first td").length;
	  const currentHeight = $("tr").length;

    if (currentWidth > 0 && currentHeight < 50 && gridLines) {
      let newRowTop = "<tr>";

      for (let i = 0; i < currentWidth; i++) {
        newRowTop += "<td></td>";
      }
      newRowTop += "</tr>";

      pixelCanvas.prepend(newRowTop);
      height.val(currentHeight+1);
    }
  });

  //Click Event - Add new row on bottom
  $("#addRowBottom").click(function() {
    const currentWidth = $("tr:first td").length;
	  const currentHeight = $("tr").length;

    if (currentWidth > 0 && currentHeight < 50 && gridLines) {
      let newRowBottom = "<tr>";

      for (let i = 0; i < currentWidth; i++) {
        newRowBottom += "<td></td>";
      }
      newRowBottom += "</tr>";

      pixelCanvas.append(newRowBottom);
      height.val(currentHeight+1);
    }
  });

  //Click Event - Add new column on left
  $("#addColumnLeft").click(function() {
	  const currentWidth = $("tr:first td").length;

    if (pixelCanvas.children() && gridLines && currentWidth < 50) {
      pixelCanvas.children().prepend("<td></td>");
      width.val(currentWidth+1);
    }
  });

  //Click Event - Add new column on right
  $("#addColumnRight").click(function() {
	  const currentWidth = $("tr:first td").length;

    if (pixelCanvas.children() && gridLines && currentWidth < 50) {
      pixelCanvas.children().append("<td></td>");
      width.val(currentWidth+1);
    }
  });

  //Click Event - Remove existing row on top
  $("#removeRowTop").click(function() {
    const currentHeight = $("tr").length;

    if (pixelCanvas.children() && gridLines && currentHeight > 1) {
      pixelCanvas.children().first().remove();
      height.val(currentHeight - 1);
    }
  });

  //Click Event - Remove existing row on bottom
  $("#removeRowBottom").click(function() {
    const currentHeight = $("tr").length;

    if (pixelCanvas.children() && gridLines && currentHeight > 1) {
      pixelCanvas.children().last().remove();
      height.val(currentHeight - 1);
    }
  });

  //Click Event - Remove existing column on left
  $("#removeColumnLeft").click(function() {
    const currentWidth = $("tr:first td").length;

    if (pixelCanvas.children() && gridLines && currentWidth > 1) {
      pixelCanvas.children().each(function() {
        $(this).children().first().remove();
      })
      width.val(currentWidth - 1);
    };
  });

  //Click Event - Remove existing column on right
  $("#removeColumnRight").click(function() {
    const currentWidth = $("tr:first td").length;

    if (pixelCanvas.children() && gridLines && currentWidth > 1) {
      pixelCanvas.children().each(function() {
        $(this).children().last().remove();
      })
      width.val(currentWidth - 1);
    }
  });

  // Click Event - Clear grid
  $("#clearGrid").click(function() {
    $("td").each(function() {
      $(this).css("background-color", "");
    });
  });

  // Click Event - Toggle grid lines
  $("#toggleGridLines").click(function() {
    if (gridLines) {
      $("td").each(function() {
        $(this).css("border", "1px solid " + $(this).css("background-color"));
      });
      $("tr").each(function() {
        $(this).css("border", "none");
      });
      gridLines = false;
    } else {
      $("td").each(function() {
        $(this).css("border", "1px solid #000");
      });
      $("tr").each(function() {
        $(this).css("border", "1px solid #000");
      });
      gridLines = true;
    }
  });

  // Event Handler (contextmenu) - Prevent right-click menu
  $(document).bind("contextmenu",function(e){
    return false;
  });

});
