<?php $title = isset($entity) ? $this->getTitle($entity) : $this->getTitle() ?>
<!DOCTYPE html>
<html lang="pt-BR" dir="ltr">
    <head>
        <meta charset="UTF-8" />
        <title><?php echo $title == $app->siteName ? $title : "{$app->siteName} - {$title}"; ?></title>
        <link rel="profile" href="http://gmpg.org/xfn/11" />
        <?php $this->head(isset($entity) ? $entity : null); ?>
        <!--[if lt IE 9]>
        <script src="<?php $this->asset('js/html5.js'); ?>" type="text/javascript"></script>
        <![endif]-->
    </head>

    <body <?php $this->bodyProperties() ?> >
       <?php $this->bodyBegin(); ?>
        <header id="main-header" class="clearfix"  ng-class="{'sombra':data.global.viewMode !== 'list'}">
            <?php $this->part('header-logo') ?>
            <?php $this->part('header-about-nav') ?>
            <?php $this->part('header-main-nav') ?>
        </header>
        <section id="main-section" class="clearfix">
            <?php if ($this->isEditable()): ?>
                <div id="ajax-response-errors" class="js-dialog" title="Corrija os erros abaixo e tente novamente.">
                    <div class="js-dialog-content"></div>
                </div>
            <?php endif; ?>
