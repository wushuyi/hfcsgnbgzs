(function ($) {
    $(document).ready(function () {
        // 获取所需元素
        $showBox = $('#showBox');
        $boxCent = $('.boxCent', $showBox);
        $box1 = $('.box1', $showBox);
        $circle = $('.circle', $showBox);

        // 初始化变量
        var autoRunCtl, autoRunIndx = 0, autoRunMax = $boxCent.length - 1;

        // 切换动画触发
        $circle.find('li').on('mouseover autoSwitch', function (e) {
            var $self = $(this);
            var index = $self.index();
            var oldSelf = $circle.find('li.action');
            var thisEl = $boxCent.filter('.action');
            var nextEL = $boxCent.eq(index);
            // 如果是自己不触发动画
            if (oldSelf.index() == nextEL.index()) {
                return false;
            }
            autoRunIndx = index;

            //console.log(autoRunIndx);
            $self.addClass('action');
            oldSelf.removeClass('action');
            thisEl.removeClass('action');
            nextEL.addClass('action');
            nextEL.find('[data-animation]').each(function (i) {
                var $self = $(this);
                $self.attr('style', '');
                var options = $self.data('animation');
                var el = options.show ? $self.show() : $self;
                TweenMax.from(el, options.time, options.css);
            });
        });
        // 初始化触发一次开场动画
        $circle.find('li:eq(0)').trigger('autoSwitch');

        // 鼠标聚焦暂停 自动切换 离开 后继续
        $showBox.on('mouseover', function (e) {
            clearInterval(autoRunCtl);
        }).on('mouseout', function (e) {
            autoRun();
        });

        // 自动切换方法
        function autoRun() {
            autoRunCtl = setInterval(function () {
                (autoRunIndx == autoRunMax) ? (autoRunIndx = 0) : autoRunIndx += 1;
                $circle.find('li:eq(' + autoRunIndx + ')').trigger('autoSwitch');
            }, 3000);
        }

        autoRun();
    });
})(window.jQuery);