'use strict';

/**
 * html2Json 改造来自: https://github.com/Jxck/html2json
 * 
 * 
 * author: Di (微信小程序开发工程师)
 * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
 *               垂直微信小程序开发交流社区
 * 
 * github地址: https://github.com/icindy/wxParse
 * 
 * for: 微信小程序富文本解析
 * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
 */

var __placeImgeUrlHttps = "https";
var __emojisReg = '';
var __emojisBaseSrc = '';
var __emojis = {};
var wxDiscode = require('./wxDiscode.js');
var HTMLParser = require('./htmlparser.js');
// Empty Elements - HTML 5
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");
// Block Elements - HTML 5
var block = makeMap("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");

// Inline Elements - HTML 5
var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

// Special Elements (can contain anything)
var special = makeMap("wxxxcode-style,script,style,view,scroll-view,block");
function makeMap(str) {
    var obj = {},
        items = str.split(",");
    for (var i = 0; i < items.length; i++) {
        obj[items[i]] = true;
    }return obj;
}

function q(v) {
    return '"' + v + '"';
}

function removeDOCTYPE(html) {
    return html.replace(/<\?xml.*\?>\n/, '').replace(/<.*!doctype.*\>\n/, '').replace(/<.*!DOCTYPE.*\>\n/, '');
}

function trimHtml(html) {
    return html.replace(/\r?\n+/g, '').replace(/<!--.*?-->/ig, '').replace(/\/\*.*?\*\//ig, '').replace(/[ ]+</ig, '<');
}

function html2json(html, bindName) {
    //处理字符串
    html = removeDOCTYPE(html);
    html = trimHtml(html);
    html = wxDiscode.strDiscode(html);
    //生成node节点
    var bufArray = [];
    var results = {
        node: bindName,
        nodes: [],
        images: [],
        imageUrls: []
    };
    var index = 0;
    HTMLParser(html, {
        start: function start(tag, attrs, unary) {
            //debug(tag, attrs, unary);
            // node for this element
            var node = {
                node: 'element',
                tag: tag
            };
            if (bufArray.length === 0) {
                node.index = index.toString();
                index += 1;
            } else {
                var parent = bufArray[0];
                if (parent.nodes === undefined) {
                    parent.nodes = [];
                }
                node.index = parent.index + '.' + parent.nodes.length;
            }

            if (block[tag]) {
                node.tagType = "block";
            } else if (inline[tag]) {
                node.tagType = "inline";
            } else if (closeSelf[tag]) {
                node.tagType = "closeSelf";
            }

            if (attrs.length !== 0) {
                node.attr = attrs.reduce(function (pre, attr) {
                    var name = attr.name;
                    var value = attr.value;
                    if (name == 'class') {
                        // console.dir(value);
                        //  value = value.join("")
                        node.classStr = value;
                    }
                    // has multi attibutes
                    // make it array of attribute
                    if (name == 'style') {
                        // console.dir(value);
                        //  value = value.join("")
                        node.styleStr = value;
                    }
                    if (value.match(/ /)) {
                        value = value.split(' ');
                    }

                    // if attr already exists
                    // merge it
                    if (pre[name]) {
                        if (Array.isArray(pre[name])) {
                            // already array, push to last
                            pre[name].push(value);
                        } else {
                            // single value, make it array
                            pre[name] = [pre[name], value];
                        }
                    } else {
                        // not exist, put it
                        pre[name] = value;
                    }

                    return pre;
                }, {});
            }

            //对img添加额外数据
            if (node.tag === 'img') {
                node.imgIndex = results.images.length;
                var imgUrl = node.attr.src;
                if (imgUrl[0] == '') {
                    imgUrl.splice(0, 1);
                }
                imgUrl = wxDiscode.urlToHttpUrl(imgUrl, __placeImgeUrlHttps);
                node.attr.src = imgUrl;
                node.from = bindName;
                results.images.push(node);
                results.imageUrls.push(imgUrl);
            }

            // 处理font标签样式属性
            if (node.tag === 'font') {
                var fontSize = ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large', '-webkit-xxx-large'];
                var styleAttrs = {
                    'color': 'color',
                    'face': 'font-family',
                    'size': 'font-size'
                };
                if (!node.attr.style) node.attr.style = [];
                if (!node.styleStr) node.styleStr = '';
                for (var key in styleAttrs) {
                    if (node.attr[key]) {
                        var value = key === 'size' ? fontSize[node.attr[key] - 1] : node.attr[key];
                        node.attr.style.push(styleAttrs[key]);
                        node.attr.style.push(value);
                        node.styleStr += styleAttrs[key] + ': ' + value + ';';
                    }
                }
            }

            //临时记录source资源
            if (node.tag === 'source') {
                results.source = node.attr.src;
            }

            if (unary) {
                // if this tag doesn't have end tag
                // like <img src="hoge.png"/>
                // add to parents
                var parent = bufArray[0] || results;
                if (parent.nodes === undefined) {
                    parent.nodes = [];
                }
                parent.nodes.push(node);
            } else {
                bufArray.unshift(node);
            }
        },
        end: function end(tag) {
            //debug(tag);
            // merge into parent tag
            var node = bufArray.shift();
            if (node.tag !== tag) console.error('invalid state: mismatch end tag');
            //当有缓存source资源时于于video补上src资源
            if (node.tag === 'video' && results.source) {
                node.attr.src = results.source;
                delete results.source;
            }
            if (node.tag === 'video' && node.attr.src) {
                node.attr.src = decodeURIComponent(node.attr.src);
            }
            if (bufArray.length === 0) {
                results.nodes.push(node);
            } else {
                var parent = bufArray[0];
                if (parent.nodes === undefined) {
                    parent.nodes = [];
                }
                parent.nodes.push(node);
            }
        },
        chars: function chars(text) {
            //debug(text);
            var node = {
                node: 'text',
                text: text,
                textArray: transEmojiStr(text)
            };

            if (bufArray.length === 0) {
                node.index = index.toString();
                index += 1;
                results.nodes.push(node);
            } else {
                var parent = bufArray[0];
                if (parent.nodes === undefined) {
                    parent.nodes = [];
                }
                node.index = parent.index + '.' + parent.nodes.length;
                parent.nodes.push(node);
            }
        },
        comment: function comment(text) {
            //debug(text);
            // var node = {
            //     node: 'comment',
            //     text: text,
            // };
            // var parent = bufArray[0];
            // if (parent.nodes === undefined) {
            //     parent.nodes = [];
            // }
            // parent.nodes.push(node);
        }
    });
    return results;
};

function transEmojiStr(str) {
    // var eReg = new RegExp("["+__reg+' '+"]");
    //   str = str.replace(/\[([^\[\]]+)\]/g,':$1:')

    var emojiObjs = [];
    //如果正则表达式为空
    if (__emojisReg.length == 0 || !__emojis) {
        var emojiObj = {};
        emojiObj.node = "text";
        emojiObj.text = str;
        array = [emojiObj];
        return array;
    }
    //这个地方需要调整
    str = str.replace(/\[([^\[\]]+)\]/g, ':$1:');
    var eReg = new RegExp("[:]");
    var array = str.split(eReg);
    for (var i = 0; i < array.length; i++) {
        var ele = array[i];
        var emojiObj = {};
        if (__emojis[ele]) {
            emojiObj.node = "element";
            emojiObj.tag = "emoji";
            emojiObj.text = __emojis[ele];
            emojiObj.baseSrc = __emojisBaseSrc;
        } else {
            emojiObj.node = "text";
            emojiObj.text = ele;
        }
        emojiObjs.push(emojiObj);
    }

    return emojiObjs;
}

function emojisInit() {
    var reg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var baseSrc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/wxParse/emojis/";
    var emojis = arguments[2];

    __emojisReg = reg;
    __emojisBaseSrc = baseSrc;
    __emojis = emojis;
}

module.exports = {
    html2json: html2json,
    emojisInit: emojisInit
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0bWwyanNvbi5qcyJdLCJuYW1lcyI6WyJfX3BsYWNlSW1nZVVybEh0dHBzIiwiX19lbW9qaXNSZWciLCJfX2Vtb2ppc0Jhc2VTcmMiLCJfX2Vtb2ppcyIsInd4RGlzY29kZSIsInJlcXVpcmUiLCJIVE1MUGFyc2VyIiwiZW1wdHkiLCJtYWtlTWFwIiwiYmxvY2siLCJpbmxpbmUiLCJjbG9zZVNlbGYiLCJmaWxsQXR0cnMiLCJzcGVjaWFsIiwic3RyIiwib2JqIiwiaXRlbXMiLCJzcGxpdCIsImkiLCJsZW5ndGgiLCJxIiwidiIsInJlbW92ZURPQ1RZUEUiLCJodG1sIiwicmVwbGFjZSIsInRyaW1IdG1sIiwiaHRtbDJqc29uIiwiYmluZE5hbWUiLCJzdHJEaXNjb2RlIiwiYnVmQXJyYXkiLCJyZXN1bHRzIiwibm9kZSIsIm5vZGVzIiwiaW1hZ2VzIiwiaW1hZ2VVcmxzIiwiaW5kZXgiLCJzdGFydCIsInRhZyIsImF0dHJzIiwidW5hcnkiLCJ0b1N0cmluZyIsInBhcmVudCIsInVuZGVmaW5lZCIsInRhZ1R5cGUiLCJhdHRyIiwicmVkdWNlIiwicHJlIiwibmFtZSIsInZhbHVlIiwiY2xhc3NTdHIiLCJzdHlsZVN0ciIsIm1hdGNoIiwiQXJyYXkiLCJpc0FycmF5IiwicHVzaCIsImltZ0luZGV4IiwiaW1nVXJsIiwic3JjIiwic3BsaWNlIiwidXJsVG9IdHRwVXJsIiwiZnJvbSIsImZvbnRTaXplIiwic3R5bGVBdHRycyIsInN0eWxlIiwia2V5Iiwic291cmNlIiwidW5zaGlmdCIsImVuZCIsInNoaWZ0IiwiY29uc29sZSIsImVycm9yIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiY2hhcnMiLCJ0ZXh0IiwidGV4dEFycmF5IiwidHJhbnNFbW9qaVN0ciIsImNvbW1lbnQiLCJlbW9qaU9ianMiLCJlbW9qaU9iaiIsImFycmF5IiwiZVJlZyIsIlJlZ0V4cCIsImVsZSIsImJhc2VTcmMiLCJlbW9qaXNJbml0IiwicmVnIiwiZW1vamlzIiwibW9kdWxlIiwiZXhw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QUFNSCxNQUFNN0QsQ0FBTixDQUFWO0FBQ0EsWUFBSTRELFdBQVcsRUFBZjtBQUNBLFlBQUczRSxTQUFTK0UsR0FBVCxDQUFILEVBQWlCO0FBQ2ZKLHFCQUFTL0MsSUFBVCxHQUFnQixTQUFoQjtBQUNBK0MscUJBQVN6QyxHQUFULEdBQWUsT0FBZjtBQUNBeUMscUJBQVNMLElBQVQsR0FBZ0J0RSxTQUFTK0UsR0FBVCxDQUFoQjtBQUNBSixxQkFBU0ssT0FBVCxHQUFrQmpGLGVBQWxCO0FBQ0QsU0FMRCxNQUtLO0FBQ0g0RSxxQkFBUy9DLElBQVQsR0FBZ0IsTUFBaEI7QUFDQStDLHFCQUFTTCxJQUFULEdBQWdCUyxHQUFoQjtBQUNEO0FBQ0RMLGtCQUFVdkIsSUFBVixDQUFld0IsUUFBZjtBQUNEOztBQUVELFdBQU9ELFNBQVA7QUFDRDs7QUFFRCxTQUFTTyxVQUFULEdBQTZEO0FBQUEsUUFBekNDLEdBQXlDLHVFQUFyQyxFQUFxQztBQUFBLFFBQWxDRixPQUFrQyx1RUFBMUIsa0JBQTBCO0FBQUEsUUFBUEcsTUFBTzs7QUFDekRyRixrQkFBY29GLEdBQWQ7QUFDQW5GLHNCQUFnQmlGLE9BQWhCO0FBQ0FoRixlQUFTbUYsTUFBVDtBQUNIOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2I5RCxlQUFXQSxTQURFO0FBRWIwRCxnQkFBV0E7QUFGRSxDQUFqQiIsImZpbGUiOiJodG1sMmpzb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGh0bWwySnNvbiDmlLnpgKDmnaXoh6o6IGh0dHBzOi8vZ2l0aHViLmNvbS9KeGNrL2h0bWwyanNvblxuICogXG4gKiBcbiAqIGF1dGhvcjogRGkgKOW+ruS/oeWwj+eoi+W6j+W8gOWPkeW3peeoi+W4iClcbiAqIG9yZ2FuaXphdGlvbjogV2VBcHBEZXYo5b6u5L+h5bCP56iL5bqP5byA5Y+R6K665Z2bKShodHRwOi8vd2VhcHBkZXYuY29tKVxuICogICAgICAgICAgICAgICDlnoLnm7Tlvq7kv6HlsI/nqIvluo/lvIDlj5HkuqTmtYHnpL7ljLpcbiAqIFxuICogZ2l0aHVi5Zyw5Z2AOiBodHRwczovL2dpdGh1Yi5jb20vaWNpbmR5L3d4UGFyc2VcbiAqIFxuICogZm9yOiDlvq7kv6HlsI/nqIvluo/lr4zmlofmnKzop6PmnpBcbiAqIGRldGFpbCA6IGh0dHA6Ly93ZWFwcGRldi5jb20vdC93eHBhcnNlLWFscGhhMC0xLWh0bWwtbWFya2Rvd24vMTg0XG4gKi9cblxudmFyIF9fcGxhY2VJbWdlVXJsSHR0cHMgPSBcImh0dHBzXCI7XG52YXIgX19lbW9qaXNSZWcgPSAnJztcbnZhciBfX2Vtb2ppc0Jhc2VTcmMgPSAnJztcbnZhciBfX2Vtb2ppcyA9IHt9O1xudmFyIHd4RGlzY29kZSA9IHJlcXVpcmUoJy4vd3hEaXNjb2RlLmpzJyk7XG52YXIgSFRNTFBhcnNlciA9IHJlcXVpcmUoJy4vaHRtbHBhcnNlci5qcycpO1xuLy8gRW1wdHkgRWxlbWVudHMgLSBIVE1MIDVcbnZhciBlbXB0eSA9IG1ha2VNYXAoXCJhcmVhLGJhc2UsYmFzZWZvbnQsYnIsY29sLGZyYW1lLGhyLGltZyxpbnB1dCxsaW5rLG1ldGEscGFyYW0sZW1iZWQsY29tbWFuZCxrZXlnZW4sc291cmNlLHRyYWNrLHdiclwiKTtcbi8vIEJsb2NrIEVsZW1lbnRzIC0gSFRNTCA1XG52YXIgYmxvY2sgPSBtYWtlTWFwKFwiYnIsYSxjb2RlLGFkZHJlc3MsYXJ0aWNsZSxhcHBsZXQsYXNpZGUsYXVkaW8sYmxvY2txdW90ZSxidXR0b24sY2FudmFzLGNlbnRlcixkZCxkZWwsZGlyLGRpdixkbCxkdCxmaWVsZHNldCxmaWdjYXB0aW9uLGZpZ3VyZSxmb290ZXIsZm9ybSxmcmFtZXNldCxoMSxoMixoMyxoNCxoNSxoNixoZWFkZXIsaGdyb3VwLGhyLGlmcmFtZSxpbnMsaXNpbmRleCxsaSxtYXAsbWVudSxub2ZyYW1lcyxub3NjcmlwdCxvYmplY3Qsb2wsb3V0cHV0LHAscHJlLHNlY3Rpb24sc2NyaXB0LHRhYmxlLHRib2R5LHRkLHRmb290LHRoLHRoZWFkLHRyLHVsLHZpZGVvXCIpO1xuXG4vLyBJbmxpbmUgRWxlbWVudHMgLSBIVE1MIDVcbnZhciBpbmxpbmUgPSBtYWtlTWFwKFwiYWJicixhY3JvbnltLGFwcGxldCxiLGJhc2Vmb250LGJkbyxiaWcsYnV0dG9uLGNpdGUsZGVsLGRmbixlbSxmb250LGksaWZyYW1lLGltZyxpbnB1dCxpbnMsa2JkLGxhYmVsLG1hcCxvYmplY3QscSxzLHNhbXAsc2NyaXB0LHNlbGVjdCxzbWFsbCxzcGFuLHN0cmlrZSxzdHJvbmcsc3ViLHN1cCx0ZXh0YXJlYSx0dCx1LHZhclwiKTtcblxuLy8gRWxlbWVudHMgdGhhdCB5b3UgY2FuLCBpbnRlbnRpb25hbGx5LCBsZWF2ZSBvcGVuXG4vLyAoYW5kIHdoaWNoIGNsb3NlIHRoZW1zZWx2ZXMpXG52YXIgY2xvc2VTZWxmID0gbWFrZU1hcChcImNvbGdyb3VwLGRkLGR0LGxpLG9wdGlvbnMscCx0ZCx0Zm9vdCx0aCx0aGVhZCx0clwiKTtcblxuLy8gQXR0cmlidXRlcyB0aGF0IGhhdmUgdGhlaXIgdmFsdWVzIGZpbGxlZCBpbiBkaXNhYmxlZD1cImRpc2FibGVkXCJcbnZhciBmaWxsQXR0cnMgPSBtYWtlTWFwKFwiY2hlY2tlZCxjb21wYWN0LGRlY2xhcmUsZGVmZXIsZGlzYWJsZWQsaXNtYXAsbXVsdGlwbGUsbm9ocmVmLG5vcmVzaXplLG5vc2hhZGUsbm93cmFwLHJlYWRvbmx5LHNlbGVjdGVkXCIpO1xuXG4vLyBTcGVjaWFsIEVsZW1lbnRzIChjYW4gY29udGFpbiBhbnl0aGluZylcbnZhciBzcGVjaWFsID0gbWFrZU1hcChcInd4eHhjb2RlLXN0eWxlLHNjcmlwdCxzdHlsZSx2aWV3LHNjcm9sbC12aWV3LGJsb2NrXCIpO1xuZnVuY3Rpb24gbWFrZU1hcChzdHIpIHtcbiAgICB2YXIgb2JqID0ge30sIGl0ZW1zID0gc3RyLnNwbGl0KFwiLFwiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKVxuICAgICAgICBvYmpbaXRlbXNbaV1dID0gdHJ1ZTtcbiAgICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBxKHYpIHtcbiAgICByZXR1cm4gJ1wiJyArIHYgKyAnXCInO1xufVxuXG5mdW5jdGlvbiByZW1vdmVET0NUWVBFKGh0bWwpIHtcbiAgICByZXR1cm4gaHRtbFxuICAgICAgICAucmVwbGFjZSgvPFxcP3htbC4qXFw/Plxcbi8sICcnKVxuICAgICAgICAucmVwbGFjZSgvPC4qIWRvY3R5cGUuKlxcPlxcbi8sICcnKVxuICAgICAgICAucmVwbGFjZSgvPC4qIURPQ1RZUEUuKlxcPlxcbi8sICcnKTtcbn1cblxuZnVuY3Rpb24gdHJpbUh0bWwoaHRtbCkge1xuICByZXR1cm4gaHRtbFxuICAgICAgICAucmVwbGFjZSgvXFxyP1xcbisvZywgJycpXG4gICAgICAgIC5yZXBsYWNlKC88IS0tLio/LS0+L2lnLCAnJylcbiAgICAgICAgLnJlcGxhY2UoL1xcL1xcKi4qP1xcKlxcLy9pZywgJycpXG4gICAgICAgIC5yZXBsYWNlKC9bIF0rPC9pZywgJzwnKVxufVxuXG5cbmZ1bmN0aW9uIGh0bWwyanNvbihodG1sLCBiaW5kTmFtZSkge1xuICAgIC8v5aSE55CG5a2X56ym5LiyXG4gICAgaHRtbCA9IHJlbW92ZURPQ1RZUEUoaHRtbCk7XG4gICAgaHRtbCA9IHRyaW1IdG1sKGh0bWwpO1xuICAgIGh0bWwgPSB3eERpc2NvZGUuc3RyRGlzY29kZShodG1sKTtcbiAgICAvL+eUn+aIkG5vZGXoioLngrlcbiAgICB2YXIgYnVmQXJyYXkgPSBbXTtcbiAgICB2YXIgcmVzdWx0cyA9IHtcbiAgICAgICAgbm9kZTogYmluZE5hbWUsXG4gICAgICAgIG5vZGVzOiBbXSxcbiAgICAgICAgaW1hZ2VzOltdLFxuICAgICAgICBpbWFnZVVybHM6W11cbiAgICB9O1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgSFRNTFBhcnNlcihodG1sLCB7XG4gICAgICAgIHN0YXJ0OiBmdW5jdGlvbiAodGFnLCBhdHRycywgdW5hcnkpIHtcbiAgICAgICAgICAgIC8vZGVidWcodGFnLCBhdHRycywgdW5hcnkpO1xuICAgICAgICAgICAgLy8gbm9kZSBmb3IgdGhpcyBlbGVtZW50XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHtcbiAgICAgICAgICAgICAgICBub2RlOiAnZWxlbWVudCcsXG4gICAgICAgICAgICAgICAgdGFnOiB0YWcsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGJ1ZkFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIG5vZGUuaW5kZXggPSBpbmRleC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgaW5kZXggKz0gMVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gYnVmQXJyYXlbMF07XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudC5ub2RlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5ub2RlcyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBub2RlLmluZGV4ID0gcGFyZW50LmluZGV4ICsgJy4nICsgcGFyZW50Lm5vZGVzLmxlbmd0aFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYmxvY2tbdGFnXSkge1xuICAgICAgICAgICAgICAgIG5vZGUudGFnVHlwZSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5saW5lW3RhZ10pIHtcbiAgICAgICAgICAgICAgICBub2RlLnRhZ1R5cGUgPSBcImlubGluZVwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjbG9zZVNlbGZbdGFnXSkge1xuICAgICAgICAgICAgICAgIG5vZGUudGFnVHlwZSA9IFwiY2xvc2VTZWxmXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhdHRycy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICBub2RlLmF0dHIgPSBhdHRycy5yZWR1Y2UoZnVuY3Rpb24gKHByZSwgYXR0cikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGF0dHIubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gYXR0ci52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUgPT0gJ2NsYXNzJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5kaXIodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gIHZhbHVlID0gdmFsdWUuam9pbihcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jbGFzc1N0ciA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGhhcyBtdWx0aSBhdHRpYnV0ZXNcbiAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBpdCBhcnJheSBvZiBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUgPT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5kaXIodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gIHZhbHVlID0gdmFsdWUuam9pbihcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zdHlsZVN0ciA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5tYXRjaCgvIC8pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgYXR0ciBhbHJlYWR5IGV4aXN0c1xuICAgICAgICAgICAgICAgICAgICAvLyBtZXJnZSBpdFxuICAgICAgICAgICAgICAgICAgICBpZiAocHJlW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcmVbbmFtZV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxyZWFkeSBhcnJheSwgcHVzaCB0byBsYXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlW25hbWVdLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzaW5nbGUgdmFsdWUsIG1ha2UgaXQgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVbbmFtZV0gPSBbcHJlW25hbWVdLCB2YWx1ZV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBub3QgZXhpc3QsIHB1dCBpdFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlW25hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJlO1xuICAgICAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy/lr7lpbWfmt7vliqDpop3lpJbmlbDmja5cbiAgICAgICAgICAgIGlmIChub2RlLnRhZyA9PT0gJ2ltZycpIHtcbiAgICAgICAgICAgICAgICBub2RlLmltZ0luZGV4ID0gcmVzdWx0cy5pbWFnZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHZhciBpbWdVcmwgPSBub2RlLmF0dHIuc3JjO1xuICAgICAgICAgICAgICAgIGlmIChpbWdVcmxbMF0gPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1nVXJsLnNwbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW1nVXJsID0gd3hEaXNjb2RlLnVybFRvSHR0cFVybChpbWdVcmwsIF9fcGxhY2VJbWdlVXJsSHR0cHMpO1xuICAgICAgICAgICAgICAgIG5vZGUuYXR0ci5zcmMgPSBpbWdVcmw7XG4gICAgICAgICAgICAgICAgbm9kZS5mcm9tID0gYmluZE5hbWU7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5pbWFnZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICByZXN1bHRzLmltYWdlVXJscy5wdXNoKGltZ1VybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIOWkhOeQhmZvbnTmoIfnrb7moLflvI/lsZ7mgKdcbiAgICAgICAgICAgIGlmIChub2RlLnRhZyA9PT0gJ2ZvbnQnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZvbnRTaXplID0gWyd4LXNtYWxsJywgJ3NtYWxsJywgJ21lZGl1bScsICdsYXJnZScsICd4LWxhcmdlJywgJ3h4LWxhcmdlJywgJy13ZWJraXQteHh4LWxhcmdlJ107XG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlQXR0cnMgPSB7XG4gICAgICAgICAgICAgICAgICAgICdjb2xvcic6ICdjb2xvcicsXG4gICAgICAgICAgICAgICAgICAgICdmYWNlJzogJ2ZvbnQtZmFtaWx5JyxcbiAgICAgICAgICAgICAgICAgICAgJ3NpemUnOiAnZm9udC1zaXplJ1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKCFub2RlLmF0dHIuc3R5bGUpIG5vZGUuYXR0ci5zdHlsZSA9IFtdO1xuICAgICAgICAgICAgICAgIGlmICghbm9kZS5zdHlsZVN0cikgbm9kZS5zdHlsZVN0ciA9ICcnO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBzdHlsZUF0dHJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmF0dHJba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0ga2V5ID09PSAnc2l6ZScgPyBmb250U2l6ZVtub2RlLmF0dHJba2V5XS0xXSA6IG5vZGUuYXR0cltrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5hdHRyLnN0eWxlLnB1c2goc3R5bGVBdHRyc1trZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuYXR0ci5zdHlsZS5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc3R5bGVTdHIgKz0gc3R5bGVBdHRyc1trZXldICsgJzogJyArIHZhbHVlICsgJzsnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL+S4tOaXtuiusOW9lXNvdXJjZei1hOa6kFxuICAgICAgICAgICAgaWYobm9kZS50YWcgPT09ICdzb3VyY2UnKXtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnNvdXJjZSA9IG5vZGUuYXR0ci5zcmM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh1bmFyeSkge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoaXMgdGFnIGRvZXNuJ3QgaGF2ZSBlbmQgdGFnXG4gICAgICAgICAgICAgICAgLy8gbGlrZSA8aW1nIHNyYz1cImhvZ2UucG5nXCIvPlxuICAgICAgICAgICAgICAgIC8vIGFkZCB0byBwYXJlbnRzXG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9IGJ1ZkFycmF5WzBdIHx8IHJlc3VsdHM7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudC5ub2RlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5ub2RlcyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJlbnQubm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYnVmQXJyYXkudW5zaGlmdChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZW5kOiBmdW5jdGlvbiAodGFnKSB7XG4gICAgICAgICAgICAvL2RlYnVnKHRhZyk7XG4gICAgICAgICAgICAvLyBtZXJnZSBpbnRvIHBhcmVudCB0YWdcbiAgICAgICAgICAgIHZhciBub2RlID0gYnVmQXJyYXkuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmIChub2RlLnRhZyAhPT0gdGFnKSBjb25zb2xlLmVycm9yKCdpbnZhbGlkIHN0YXRlOiBtaXNtYXRjaCBlbmQgdGFnJyk7XG4gICAgICAgICAgICAvL+W9k+aciee8k+WtmHNvdXJjZei1hOa6kOaXtuS6juS6jnZpZGVv6KGl5LiKc3Jj6LWE5rqQXG4gICAgICAgICAgICBpZihub2RlLnRhZyA9PT0gJ3ZpZGVvJyAmJiByZXN1bHRzLnNvdXJjZSl7XG4gICAgICAgICAgICAgICAgbm9kZS5hdHRyLnNyYyA9IHJlc3VsdHMuc291cmNlO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSByZXN1bHRzLnNvdXJjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub2RlLnRhZyA9PT0gJ3ZpZGVvJyAmJiBub2RlLmF0dHIuc3JjKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5hdHRyLnNyYyA9IGRlY29kZVVSSUNvbXBvbmVudChub2RlLmF0dHIuc3JjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChidWZBcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLm5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSBidWZBcnJheVswXTtcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50Lm5vZGVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Lm5vZGVzID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcmVudC5ub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjaGFyczogZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgIC8vZGVidWcodGV4dCk7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHtcbiAgICAgICAgICAgICAgICBub2RlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgICAgICB0ZXh0QXJyYXk6dHJhbnNFbW9qaVN0cih0ZXh0KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGJ1ZkFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIG5vZGUuaW5kZXggPSBpbmRleC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgaW5kZXggKz0gMVxuICAgICAgICAgICAgICAgIHJlc3VsdHMubm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9IGJ1ZkFycmF5WzBdO1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQubm9kZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQubm9kZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbm9kZS5pbmRleCA9IHBhcmVudC5pbmRleCArICcuJyArIHBhcmVudC5ub2Rlcy5sZW5ndGhcbiAgICAgICAgICAgICAgICBwYXJlbnQubm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tbWVudDogZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgIC8vZGVidWcodGV4dCk7XG4gICAgICAgICAgICAvLyB2YXIgbm9kZSA9IHtcbiAgICAgICAgICAgIC8vICAgICBub2RlOiAnY29tbWVudCcsXG4gICAgICAgICAgICAvLyAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIC8vIH07XG4gICAgICAgICAgICAvLyB2YXIgcGFyZW50ID0gYnVmQXJyYXlbMF07XG4gICAgICAgICAgICAvLyBpZiAocGFyZW50Lm5vZGVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vICAgICBwYXJlbnQubm9kZXMgPSBbXTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIHBhcmVudC5ub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICB9LFxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHRzO1xufTtcblxuZnVuY3Rpb24gdHJhbnNFbW9qaVN0cihzdHIpe1xuICAvLyB2YXIgZVJlZyA9IG5ldyBSZWdFeHAoXCJbXCIrX19yZWcrJyAnK1wiXVwiKTtcbi8vICAgc3RyID0gc3RyLnJlcGxhY2UoL1xcWyhbXlxcW1xcXV0rKVxcXS9nLCc6JDE6JylcbiAgXG4gIHZhciBlbW9qaU9ianMgPSBbXTtcbiAgLy/lpoLmnpzmraPliJnooajovr7lvI/kuLrnqbpcbiAgaWYoX19lbW9qaXNSZWcubGVuZ3RoID09IDAgfHwgIV9fZW1vamlzKXtcbiAgICAgIHZhciBlbW9qaU9iaiA9IHt9XG4gICAgICBlbW9qaU9iai5ub2RlID0gXCJ0ZXh0XCI7XG4gICAgICBlbW9qaU9iai50ZXh0ID0gc3RyO1xuICAgICAgYXJyYXkgPSBbZW1vamlPYmpdO1xuICAgICAgcmV0dXJuIGFycmF5O1xuICB9XG4gIC8v6L+Z5Liq5Zyw5pa56ZyA6KaB6LCD5pW0XG4gIHN0ciA9IHN0ci5yZXBsYWNlKC9cXFsoW15cXFtcXF1dKylcXF0vZywnOiQxOicpXG4gIHZhciBlUmVnID0gbmV3IFJlZ0V4cChcIls6XVwiKTtcbiAgdmFyIGFycmF5ID0gc3RyLnNwbGl0KGVSZWcpO1xuICBmb3IodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspe1xuICAgIHZhciBlbGUgPSBhcnJheVtpXTtcbiAgICB2YXIgZW1vamlPYmogPSB7fTtcbiAgICBpZihfX2Vtb2ppc1tlbGVdKXtcbiAgICAgIGVtb2ppT2JqLm5vZGUgPSBcImVsZW1lbnRcIjtcbiAgICAgIGVtb2ppT2JqLnRhZyA9IFwiZW1vamlcIjtcbiAgICAgIGVtb2ppT2JqLnRleHQgPSBfX2Vtb2ppc1tlbGVdO1xuICAgICAgZW1vamlPYmouYmFzZVNyYz0gX19lbW9qaXNCYXNlU3JjO1xuICAgIH1lbHNle1xuICAgICAgZW1vamlPYmoubm9kZSA9IFwidGV4dFwiO1xuICAgICAgZW1vamlPYmoudGV4dCA9IGVsZTtcbiAgICB9XG4gICAgZW1vamlPYmpzLnB1c2goZW1vamlPYmopO1xuICB9XG4gIFxuICByZXR1cm4gZW1vamlPYmpzO1xufVxuXG5mdW5jdGlvbiBlbW9qaXNJbml0KHJlZz0nJyxiYXNlU3JjPVwiL3d4UGFyc2UvZW1vamlzL1wiLGVtb2ppcyl7XG4gICAgX19lbW9qaXNSZWcgPSByZWc7XG4gICAgX19lbW9qaXNCYXNlU3JjPWJhc2VTcmM7XG4gICAgX19lbW9qaXM9ZW1vamlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBodG1sMmpzb246IGh0bWwyanNvbixcbiAgICBlbW9qaXNJbml0OmVtb2ppc0luaXRcbn07XG5cbiJdfQ==