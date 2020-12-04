<script>
import Editor from "../utils/editor";
Editor.addPlugin({
    type: "custom",
    name: "测试",
    icon: "",
});
// export function addTest() {
//     Editor.addPlugin({
//         type: "custom",
//         name: "测试",
//         icon: "",
//     });
// }
export default {
    name: "test",
    props: {},
    data() {
        return {};
    },
    render() {
        return <div>test</div>;
    },
};
</script>

