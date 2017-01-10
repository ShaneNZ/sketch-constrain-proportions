// constrainProportions

function onRun(context) {

    // We are passed a context variable when we're run.
    // We use this to get hold of a javascript object
    // which we can use in turn to manipulate Sketch.
    // var sketch = context.api();
    var sketch = context.api();

    var app = context.document; // used for UI messaging in the current document

    // Next we want to extract the selected page of the selected (front-most) document
    var document = sketch.selectedDocument; // don't actually need these because this is so simple
    var page = document.selectedPage; // don't actually need these because this is so simple

    var selectedLayers = context.selection;
    var selectedCount = selectedLayers.count();

    log('--- constrain proportions ---')

    if (selectedCount == 0) {
        // nothing to do, silently do it
        log('  No layers selected.');
        app.showMessage("No layers selected.");

    } else if (selectedCount == 1) {
        // if we have just a single object selected, then we just want to toggle constrainProportions
        var layer = selectedLayers[0];
        var f = [layer frame];

        if ([f constrainProportions]) {
            [layer setConstrainProportions: 0];
            app.showMessage('1 layer unconstrained.');
        } else {
            [layer setConstrainProportions: 1];
            app.showMessage('1 layer constrained.');
        }
        log('  1 layer: ' + layer.name() + ': ' + [f constrainProportions]);

    } else {
        // multiple objects selected

        log('  ' + selectedCount + ' layers:')
        var cpSum = 0;

        for (var i = 0; i < selectedCount; i++) {
            var layer = selectedLayers[i];
            var f = [layer frame];

            cpSum = cpSum + [f constrainProportions];
            log('    ' + layer.name() + ': ' + [f constrainProportions])
        };

        log('  Sum: ' + cpSum);

        // If the constraints are different or they're all unconstrained, we
        // constrain them all. If they're all constrained, we unconstrain them all
        var newConstraint = 1;
        if (cpSum == selectedCount) {
            newConstraint = 0;
            app.showMessage(selectedCount + ' layers unconstrained.')
        } else {
            // constraint value is already set, we just need to display the message
            app.showMessage(selectedCount + ' layers constrained.')
        }


        log('  New constraint: ' + newConstraint);

        // write the new constraint into all objects
        for (var i = 0; i < selectedCount; i++) {
            var layer = selectedLayers[i];
            [layer setConstrainProportions: newConstraint];
        };

        // display what we've done

    };
};
