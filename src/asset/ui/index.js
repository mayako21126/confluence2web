/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mayako
 * @Date: 2022-11-24 15:57:09
 * @LastEditors: mayako
 * @LastEditTime: 2022-11-29 11:48:00
 */
$(function () {
  var initSelectableTree = function () {
    return $('#treeview-selectable').treeview({
      data: defaultData,
      expandIcon: 'glyphicon glyphicon-menu-up',
      collapseIcon: 'glyphicon glyphicon-menu-down',
      onNodeSelected: function (event, node) {
        window.location.hash = '#'+node.nodeId
       $('#contentIf').attr("src",'./'+node.id+'/index.html');
      },
      onNodeUnselected: function (event, node) {
        
      }
    });
  };
  var $selectableTree = initSelectableTree();
  // var findSelectableNodes = function () {
  //   return $selectableTree.treeview('search', [$('#input-select-node').val(), {
  //     ignoreCase: false,
  //     exactMatch: false
  //   }]);
  // };
  // var selectableNodes = findSelectableNodes();
  if(window.location.hash!==''){
    var id = window.location.hash.replace('#','')
    var topNode = function () {
      return $selectableTree.treeview('getNode', id);
    }();
    $selectableTree.treeview('selectNode', [topNode, {
    }]);
  }else{
    var topNode = function () {
      return $selectableTree.treeview('getNode', 0);
    }();
    $selectableTree.treeview('selectNode', [topNode, {
    }]);
  }
  $('[data-toggle="tooltip"]').tooltip()
  // Select/unselect/toggle nodes
  // $('#input-select-node').on('keyup', function (e) {
  //   selectableNodes = findSelectableNodes();
  //   $('.select-node').prop('disabled', !(selectableNodes.length >= 1));
  // });
  // $('#btn-select-node.select-node').on('click', function (e) {
  //   $selectableTree.treeview('selectNode', [selectableNodes, {
  //     silent: $('#chk-select-silent').is(':checked')
  //   }]);
  // });
});