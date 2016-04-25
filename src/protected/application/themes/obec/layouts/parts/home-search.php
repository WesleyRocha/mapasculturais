<section id="home-intro" class="js-page-menu-item home-entity clearfix">
    <div class="branding">
        <span class="tipo">Mapa das Nuvens</span>
        <h1>Seja bem vindo!</h1>
        <p class="text">Mapa das Nuvens é uma plataforma colaborativa que reúne informações sobre agentes, espaços, eventos e projetos culturais, fornecendo ao poder público uma radiografia da área de cultura e ao cidadão um mapa de espaçs e eventos culturais da região. A plataforma está alinhada ao Sistema Nacional de Informação e Indicadores Culturais do Ministério da Cultura (SNIIC) e contribui para a realização de alguns dos objetivos do Plano Nacional de Cultura.</p>
        <div class="parceiros">
            <span class="logo-gdf"></span>
            <span class="logo-obec"></span>
            <span class="logo-unb"></span>
        </div>
    </div>
    <div class="box">
        <form id="home-search-form" class="clearfix" ng-non-bindable>
            <h1>Cartografia cultural do DF.</h1>
            <div class="rota">
                <div class="rota1"></div>
                <div class="rota2"></div>
                <div class="view-more"><a class="hltip icon icon-select-arrow" href="#home-events" title="Saiba mais"></a></div>
            </div>
            <input tabindex="1" id="campo-de-busca" class="search-field" type="text" name="campo-de-busca" placeholder="Digite uma palavra-chave"/>
            <div id="home-search-filter" class="dropdown" data-searh-url-template="<?php echo $app->createUrl('site','search'); ?>##(global:(enabled:({{entity}}:!t),filterEntity:{{entity}}),{{entity}}:(keyword:'{{keyword}}'))">
                <div class="placeholder"><span class="icon icon-search"></span> Buscar</div>
                <div class="submenu-dropdown">
                    <ul>
                        <?php if($app->isEnabled('events')): ?>
                            <li tabindex="2" id="events-filter"  data-entity="event"><span class="icon icon-event"></span> Eventos</li>
                        <?php endif; ?>
                        
                        <?php if($app->isEnabled('agents')): ?>
                            <li tabindex="3" id="agents-filter"  data-entity="agent"><span class="icon icon-agent"></span> Agentes</li>
                        <?php endif; ?>
                        
                        <?php if($app->isEnabled('spaces')): ?>
                            <li tabindex="4" id="spaces-filter"  data-entity="space"><span class="icon icon-space"></span> <?php $this->dict('entities: Spaces') ?></li>
                        <?php endif; ?>
                        
                        <?php if($app->isEnabled('projects')): ?>
                            <li tabindex="5" id="projects-filter" data-entity="project" data-searh-url-template="<?php echo $app->createUrl('site','search'); ?>##(global:(enabled:({{entity}}:!t),filterEntity:{{entity}},viewMode:list),{{entity}}:(keyword:'{{keyword}}'))"><span class="icon icon-project"></span> Projetos</li>
                        <?php endif; ?>
                    </ul>
                </div>
            </div>
        </form>
        <!-- <a class="btn btn-accent btn-large" href="<?php echo $app->createUrl('panel') ?>"><?php $this->dict('home: colabore') ?></a> -->
    </div>
</section>