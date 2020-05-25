import { FsServicesService } from '../../../_services/fs/fs-services.service';
import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';

declare let H: any;
declare let $: any;
@Component({
    selector: 'app-here-map',
    templateUrl: './here-map.component.html',
    styleUrls: ['./here-map.component.less']
})
export class HereMapComponent implements OnInit, AfterViewInit {
    @ViewChild('map', { static: true }) public mapElement: ElementRef;
    @Output() public hereOutput = new EventEmitter<any>();
    @Input() public appId: any;
    @Input() public appCode: any;
    @Input() public lat: any;
    @Input() public lng: any;
    @Input() public width: any;
    @Input() public height: any;

    ui: any;
    platform: any;
    listGroups = [];
    map: any;
    router: any;

    public constructor(private fsServices: FsServicesService) { }

    ngOnInit() {
        this.fsServices.getLocation();
        this.platform = new H.service.Platform({
            app_id: this.appId,
            app_code: this.appCode,
            useHTTPS: true
        });
        $(window).resize(() => {
            this.map.getViewPort().resize();
        });
        this.router = this.platform.getRoutingService();
    }

    ngAfterViewInit() {
        try {
            this.createMap();
            this.myMarker();
            setInterval(() => {
                $('#search-content').css('visibility', 'visible');
            }, 600);
        } catch (e) {
            console.log(e);
        }
    }

    createMap() {
        const defaultLayers = this.platform.createDefaultLayers();
        this.map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.normal.map,
            {
                zoom: 14.7,
                center: { lat: this.lat, lng: this.lng }
            }
        );
        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
        this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
    }

    myMarker() {
        const group = new H.map.Group();
        const image = './assets/fs-icons/pinkMarker.png';
        const icon = new H.map.Icon(image);
        const myLocation = { lat: this.lat, lng: this.lng };
        const htmlContent = `Your Location`;
        this.map.addObject(group);
        this.addMarkerToGroup(
            '',
            group,
            myLocation,
            htmlContent,
            { icon }
        );
    }

    venueInformations(data: any) {
        const group = new H.map.Group();
        this.listGroups.push(group);
        this.listGroups.map(m => this.venueMarker(data, m));
        this.ui.getBubbles().forEach(b => this.ui.removeBubble(b));
    }

    venueMarker(venueInfo: any, group: any) {
        const vLat = venueInfo.venue.location.lat;
        const vLng = venueInfo.venue.location.lng;
        const vName = venueInfo.venue.name;
        const image = './assets/fs-icons/blueMarker.png';
        const icon = new H.map.Icon(image);
        this.map.addObject(group);
        this.addMarkerToGroup(
            venueInfo,
            group,
            { lat: vLat, lng: vLng },
            `${vName}`,
            { icon }
        );
    }

    addMarkerToGroup(venueInfo, group: any, coordinate: any, htmlContent: any, icon: any) {
        const marker = new H.map.Marker(coordinate, icon);
        marker.setData(htmlContent);
        this.createBubble(venueInfo, marker);
        group.addObject(marker);
    }

    createBubble(venueInfo: any, markerInfo: any) {
        markerInfo.addEventListener('tap', evt => {
            // Remove bubble and fs-card-active class
            this.ui.getBubbles().forEach(b => this.ui.removeBubble(b));
            $(`.panel-card`).removeClass('fs-card-active');
            $('.scrollbar').scrollTop(0);
            // Create bubble
            const bubble = new H.ui.InfoBubble(evt.target.getPosition(), {
                content: evt.target.getData()
            });

            if (venueInfo !== '') {
                $('.scrollbar').stop().animate({
                    scrollTop: $(`#${venueInfo.venue.id}`).offset().top - 200
                }, 1);
                $(`#${venueInfo.venue.id}`).addClass('fs-card-active');
            }
            // Add bubble
            this.ui.addBubble(bubble);
        }, false);
    }

    removeVenueMarker() {
        this.listGroups.map(m => this.map.removeObject(m));
        this.listGroups = [];
    }

    selectMarker(element: any) {
        const vLat = element.venue.location.lat;
        const vLng = element.venue.location.lng;
        let bubble: any;
        this.ui.getBubbles().forEach(b => this.ui.removeBubble(b));
        bubble = new H.ui.InfoBubble({ lat: vLat, lng: vLng }, {
            content: element.venue.name
        });
        this.ui.addBubble(bubble);
        this.map.setCenter({ lat: vLat, lng: vLng });
    }
}
