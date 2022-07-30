<template>
    <div>
        <page-title />

        <div class="search_table">
            <table>
                <colgroup>
                    <col style="width: 150px;" />
                    <col style="width: auto;" />
                    <col style="width: 150px;" />
                    <col style="width: auto;" />
                </colgroup>
                <tbody>
                <tr>
                    <th class="e">텍스트</th>
                    <td><input type="text" /></td>
                    <th>select</th>
                    <td>
                        <common-select-box :options="selectBoxOptions" :value="selectBoxValue"/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="ly_con">
            <div>
                <div class="con_title">
                    <h3>대 메뉴 목록</h3>
                </div>
                <div>

                </div>
            </div>
            <div>
                <div class="con_title">
                    <h3>중 메뉴 목록</h3>
                </div>
                <div>

                </div>
            </div>
            <div>
                <div class="con_title">
                    <h3>소 메뉴 목록</h3>
                </div>
                <div>

                </div>
            </div>

        </div>

        <div>
            <div class="con_title">
                <h3>그리드</h3>
            </div>
            <div>
                <Grid id="testGrid" ref="testGrid" v-bind="testGridProps"/>
            </div>
        </div>
    </div>
</template>

<script>
import PageTitle from "@/components/common/PageTitle";
import CommonSelectBox from "@/components/common/CommonSelectBox";
import { Grid } from "@toast-ui/vue-grid";

export default {
    name: "MainDashBoard",
    components: {CommonSelectBox, PageTitle, Grid},
    data: () => ({
        selectBoxOptions: {
            name: "testSelectBox",
            allText: "- 전체 -",
            allValue: "ALL",
            dataValueName: "value",
            dataLabelName: "text",
            width: "50px",
            data: [
                {
                    code: "Y", text: "사용",
                },
                {
                    code: "N", text: "미사용",
                }
            ]
        },

        selectBoxValue : "ALL",
        testGridProps : null
    }),
    created() {
        this.selectBoxOptions = {
            name: "testSelectBox",
            allText: "- 전체 -",
            allValue: "ALL",
            dataValueName: "code",
            dataLabelName: "text",
            width: "80px",
            data: [
                {
                    code: "Y", text: "사용",
                },
                {
                    code: "N", text: "미사용",
                }
            ]
        };

        this.testGridProps = {
            name: "testGrid",
            columns : [
                { desc: "test1Desc", header: "test1Header", name: "test1", align: "center"},
                { desc: "test2Desc", header: "test2Header", name: "test2", align: "center"},
                { desc: "test3Desc", header: "test3Header", name: "test3", align: "center"},
                { desc: "test4Desc", header: "test4Header", name: "test4", align: "center"}
            ],
            data: [
                {
                    test1: "test1-1", test2: "test1-2",test3: "test1-3", test4: "test1-4",
                },
                {
                    test1: "test2-1", test2: "test2-2",test3: "test2-3", test4: "test2-4",
                },
                {
                    test1: "test3-1", test2: "test3-2",test3: "test3-3", test4: "test3-4",
                }

            ]
        };
    }

};
</script>

